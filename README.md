# Homepage - 宇宙の星

3D空間に星が漂う、ユニークなUIのホームページです。

## 技術スタック

- **Three.js**: 3Dレンダリング
- **HTML/CSS/JavaScript**: バニラJS（フレームワーク不使用）

## GitHub Pages で公開する手順

このプロジェクトは GitHub Actions を使用して自動デプロイされます。

### 1. GitHub で新規リポジトリを作成

- 任意の名前（例: `homepage`）で公開（Public）リポジトリを作成

### 2. コードを push

```bash
cd /Users/nattsu/dev/homepage
git init
git add .
git commit -m "Initialize homepage"
git branch -M main
git remote add origin https://github.com/<username>/homepage.git
git push -u origin main
```

### 3. GitHub Pages を有効化

1. GitHub のリポジトリ画面 → **Settings** → **Pages**
2. **Build and deployment**
   - Source: **GitHub Actions**
3. 保存すると、`.github/workflows/deploy.yml` が自動的に実行されます

### 4. 公開URL

- Settings → Pages に公開URLが表示されます
- 例: `https://<username>.github.io/<repo>/`

## 星の追加方法

星を追加するには、`docs/stars/data.json` に新しいエントリを追加してください。

詳細は `history.md` を参照してください。

## カスタマイズポイント

- `docs/stars/data.json`: 星のデータを管理
- `docs/stars/config.json`: 星システムの設定（アニメーション、カメラなど）
- `docs/index.html`: メインの宇宙空間
- 独自ドメインを使う場合は `docs/CNAME` にドメイン名を記述

## トラブルシューティング

- 404 になる: Pages の Source が **GitHub Actions** になっているか確認
- 反映が遅い: 初回は数分かかることがあります。Actions タブでデプロイ状況を確認
- デプロイが失敗する: `.github/workflows/deploy.yml` のブランチ名が正しいか確認（デフォルトは `main`）
