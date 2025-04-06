# 🐶 Icony（アイコニー）

愛犬画像からアイコンを生成する Web サービス

Nuxt3 + Docker + MinIO による、**画像アップロードから自動アイコン生成、保存までを行う開発プラットフォーム**です。  
ローカルでは GUI 付き S3 互換ストレージ MinIO に対応しています。

## 使用技術

- Nuxt3(SSR)
- TypeScript
- Docker
- MinIO

## 開発環境起動方法

```bash
make up
```

## 🌐 起動後のアクセス URL

| サービス  | URL                   | 説明                             |
| --------- | --------------------- | -------------------------------- |
| Nuxt App  | http://localhost:3000 | アイコン生成アプリ（SSR + API）  |
| MinIO GUI | http://localhost:9001 | S3 モックの GUI ブラウザ管理画面 |

## 🧪 Makefile コマンド一覧

| コマンド           | 内容                                               |
| ------------------ | -------------------------------------------------- |
| `make up`          | コンテナ起動（バックグラウンド）＋ブラウザ自動起動 |
| `make rebuild`     | コンテナ再ビルド＋起動                             |
| `make down`        | コンテナ停止＋削除（ボリュームは残す）             |
| `make clean-build` | キャッシュ無効でクリーンビルド                     |
| `make logs`        | すべてのサービスログをリアルタイム表示             |
| `make logs-front`  | `front` サービスのログのみ表示                     |
| `make shell`       | `front` コンテナにシェルで入る                     |

## 📦 初期化済みバケット

Docker 起動時に下記バケットは自動で作成されます

- generated
- uploads
