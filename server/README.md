# Alcoho-Rhythm API server

## 開発環境構築

### 1. 署名キーの作成

JWTの署名のために、 `JWT_SECRET` という名前の環境変数を設定します。
以下のコマンドを実行してください:

```bash
cd server
echo "JWT_SECRET=$(openssl rand -base64 32)" > .env
```

### 2. pnpm のインストール

このプロジェクトは pnpm を使用しています。
pnpm のインストール方法は以下のリンクを参照してください。

<https://pnpm.io/ja/installation>

npm を既に使える場合は、以下のコマンドで pnpm をインストールできます。

```bash
npm install -g pnpm
```

### 3. 開発を始める

#### パッケージのインストール

```bash
pnpm install
```

#### サーバーの起動

以下のコマンドを実行してください。

```bash
pnpm start
```
