# GitHub Pages で公開する手順

このプロジェクトは `docs/` ディレクトリから GitHub Pages で公開できる構成です。

## 手順

1) GitHub で新規リポジトリを作成
- 任意の名前（例: `homepage`）で公開（Public）リポジトリを作成
- まだローカルに Git 初期化していない場合は下記の「初回 push コマンド例」を参照

2) コードを push
- 下のコマンド例を実行して `main` ブランチに push します

3) GitHub Pages を有効化
- GitHub のリポジトリ画面 → Settings → Pages
- Build and deployment
  - Source: Deploy from a branch
  - Branch: `main` / `/docs`
- 保存（Save）すると数十秒〜数分でデプロイが走ります

4) 公開URL
- Settings → Pages に公開URLが表示されます（例: `https://<username>.github.io/<repo>/`）

## 初回 push コマンド例

```bash
# 1. プロジェクトディレクトリへ移動
cd /Users/nattsu/dev/homepage

# 2. Git 初期化（まだなら）
git init
git add .
git commit -m "Initialize GitHub Pages site"

# 3. GitHub の空リポジトリを origin に設定
# 例: https://github.com/<username>/homepage.git に置き換えてください
git branch -M main
git remote add origin https://github.com/<username>/homepage.git

# 4. push
git push -u origin main
```

## カスタマイズポイント
- `docs/index.html` の文言・セクションを編集
- `docs/styles.css` で配色やレイアウトを調整
- Jekyll を使わないための `docs/.nojekyll` はそのままでOK（必要なら追加）
- 独自ドメインを使う場合は `docs/CNAME` にドメイン名を記述

## トラブルシューティング
- 404 になる: Pages の Source/Branch 設定が `main` の `/docs` になっているか確認
- 反映が遅い: 初回は数分かかることがあります。キャッシュをクリアして再読込
- 画像/スタイルが当たらない: 相対パス `./styles.css` のパス崩れに注意
