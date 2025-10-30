#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';

const notesDir = path.resolve(process.cwd(), 'docs/notes');
const manifestPath = path.join(notesDir, 'index.json');

function parseSimpleMeta(mdText) {
  const lines = mdText.split(/\r?\n/);
  let title = '';
  let date = '';
  let tags = [];
  for (const line of lines) {
    if (!title && line.startsWith('# ')) title = line.slice(2).trim();
    if (!date && line.startsWith('- 日付:')) date = line.replace('- 日付:', '').trim();
    if (tags.length === 0 && line.startsWith('- タグ:')) {
      const raw = line.replace('- タグ:', '').trim();
      tags = raw.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (title && date && tags.length) break;
  }
  return { title, date, tags };
}

function fallbackDateFromFilename(file) {
  // e.g. note-20251030.md → 2025-10-30
  const m = file.match(/(20\d{2})(\d{2})(\d{2})/);
  if (!m) return '';
  return `${m[1]}-${m[2]}-${m[3]}`;
}

async function main() {
  await fs.mkdir(notesDir, { recursive: true });
  const files = (await fs.readdir(notesDir)).filter(f => f.toLowerCase().endsWith('.md'));
  const items = [];
  for (const file of files) {
    const full = path.join(notesDir, file);
    const text = await fs.readFile(full, 'utf8');
    const meta = parseSimpleMeta(text);
    const item = {
      title: meta.title || path.parse(file).name,
      date: meta.date || fallbackDateFromFilename(file) || new Date().toISOString().slice(0, 10),
      file,
      tags: meta.tags || []
    };
    items.push(item);
  }
  items.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
  const json = JSON.stringify(items, null, 2) + '\n';
  await fs.writeFile(manifestPath, json, 'utf8');
  console.log(`Wrote ${items.length} notes → ${manifestPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});


