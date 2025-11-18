# システム構成

## プロジェクト概要

3D空間に星が漂う、ユニークなUIのホームページシステム。各コンテンツ（ページ、リンクなど）が星として表現され、クリックで遷移するインタラクティブなシステムです。

## 技術スタック

- **フロントエンド**: HTML5, CSS3, JavaScript (ES6+)
- **3Dレンダリング**: Three.js v0.160.0
- **コントロール**: OrbitControls (Three.js Addon)
- **デプロイ**: GitHub Pages + GitHub Actions
- **データ形式**: JSON

## ディレクトリ構造

```
homepage/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions デプロイ設定
├── docs/                        # 公開ディレクトリ（GitHub Pages）
│   ├── .nojekyll               # Jekyll無効化
│   ├── index.html              # メインページ（宇宙空間）
│   ├── stars/
│   │   ├── data.json           # 星のデータ（名前、URL、位置、色など）
│   │   └── config.json         # 星システムの設定
│   ├── notes.html              # ノート一覧ページ
│   ├── links.html              # リンク一覧ページ
│   ├── links.json              # リンクデータ（links.html用）
│   ├── github.html             # GitHubページ
│   ├── youtube.html            # YouTubeページ
│   ├── twitter.html            # X(Twitter)ページ
│   └── test1.html              # テストページ
├── history.md                   # 開発履歴・ドキュメント
├── README.md                    # プロジェクト説明
└── SYSTEM.md                    # このファイル（システム構成）

```

## 主要コンポーネント

### 1. メインページ (`docs/index.html`)

**役割**: 3D宇宙空間を表示し、星のインタラクションを管理

**主要機能**:
- Three.jsシーンの初期化
- JSONファイルから星データと設定を読み込み
- 星の生成と配置
- マウス操作（ホバー、クリック）の検知
- カメラアニメーション（星への接近）
- ページ遷移（星の色をURLパラメータとして渡す）

**主要な関数**:
- `loadConfig()`: `stars/config.json`を読み込み
- `loadStarsData()`: `stars/data.json`を読み込み
- `createStars()`: 星の3Dオブジェクトを生成
- `createBackgroundStars()`: 背景の装飾用星を生成
- `animateCameraToStar()`: カメラを星に向かって移動
- `onMouseMove()`: マウスホバー時の処理（ラベル表示）
- `onMouseClick()`: クリック時の処理（アニメーション→遷移）

### 2. 星データ (`docs/stars/data.json`)

**構造**:
```json
{
  "id": "unique-id",           // 星の一意ID
  "name": "星の名前",           // 表示名
  "url": "./target.html",      // 遷移先URL
  "position": [x, y, z],       // 3D空間での位置
  "color": "0xrrggbb",         // 色（16進数）
  "type": "page",              // タイプ（page/external/note）
  "description": "説明文"      // ホバー時に表示
}
```

**現在の星**:
- Notes (金色)
- Links (シアン)
- GitHub (白)
- YouTube (赤)
- X(Twitter) (青)
- テスト１ (緑)

### 3. 星設定 (`docs/stars/config.json`)

**設定項目**:
- `starTypes`: タイプごとのサイズ・グロー設定
- `animation`: カメラアニメーション設定（時間、距離、拡大率）
- `background`: 背景の星の設定（数、サイズ、透明度）
- `camera`: カメラ設定（視野角、クリッピング面など）
- `controls`: OrbitControls設定（ダンピング、ズーム範囲など）

### 4. コンテンツページ

各星の遷移先ページ（`github.html`, `youtube.html`, `twitter.html`, `test1.html`など）

**共通機能**:
- Three.js背景（装飾用の星）
- URLパラメータ `?bg=rrggbb` から背景色を取得して適用
- 「宇宙に戻る」ボタン（`./index.html`へのリンク）

### 5. デプロイ設定 (`.github/workflows/deploy.yml`)

**機能**:
- `main`ブランチへのpushで自動デプロイ
- `docs/`ディレクトリをGitHub Pagesに公開
- GitHub Actionsを使用

## データフロー

```
1. ページ読み込み
   ↓
2. index.html が stars/config.json と stars/data.json を読み込み
   ↓
3. 設定を適用（カメラ、コントロールなど）
   ↓
4. 星の3Dオブジェクトを生成
   ↓
5. 背景の星を生成
   ↓
6. アニメーションループ開始
   ↓
7. ユーザー操作
   ├─ マウスホバー → ラベル表示
   └─ クリック → カメラアニメーション → ページ遷移（色をURLパラメータとして渡す）
```

## インタラクション

### マウス操作

- **左クリック**: 星を選択して遷移
- **右クリック/中クリック**: カメラの回転・ズーム（OrbitControls）
- **ホバー**: 星のラベル表示

### カメラアニメーション

1. 星をクリック
2. カメラが星に向かって移動（2秒間）
3. 星が拡大（2倍）
4. 背景色が星の色に変化
5. 遷移先ページへ移動（色をURLパラメータとして渡す）

## 拡張性

### 星の追加

`docs/stars/data.json`に新しいエントリを追加するだけで、新しい星が自動的に表示されます。

### 設定のカスタマイズ

`docs/stars/config.json`で以下をカスタマイズ可能:
- 星のサイズ・見た目
- アニメーション速度・距離
- 背景の星の数・サイズ
- カメラの動作
- コントロールの感度

## パフォーマンス

- **背景の星**: 200個（設定可能）
- **メインの星**: 現在6個（JSONで管理）
- **レンダリング**: requestAnimationFrameで60fpsを目指す
- **CDN**: Three.jsはCDNから読み込み（キャッシュ効率化）

## ブラウザ対応

- WebGL対応ブラウザ必須
- ES6+モジュール対応
- モダンブラウザ推奨（Chrome, Firefox, Safari, Edge）

## デプロイ

1. コードをGitHubにpush
2. GitHub Actionsが自動実行
3. `docs/`ディレクトリがGitHub Pagesに公開
4. 数分で反映

## 今後の拡張予定

- 星の検索機能
- 星のフィルタリング機能
- 星の軌道カスタマイズ
- パフォーマンス最適化
- アクセシビリティ向上（キーボード操作、スクリーンリーダー対応）

