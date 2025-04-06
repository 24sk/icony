# Makefile

# 開発環境の起動（バックグラウンド＆ブラウザ自動オープン）
up:
	docker compose up -d
	sleep 2
	open http://localhost:3000

# 開発環境をビルドして起動（依存やDockerfile変更時）
rebuild:
	docker compose up -d --build
	sleep 2
	open http://localhost:3000

# 開発環境の停止（コンテナは残す）
stop:
	docker compose stop

# 完全停止＆削除（ボリューム除外）
down:
	docker compose down

# キャッシュ無効でクリーンビルド
clean-build:
	docker compose build --no-cache

# ログ確認
logs:
	docker compose logs -f

# frontサービスのみにログを絞る
logs-front:
	docker compose logs -f front

# コンテナに入る（開発用）
shell:
	docker compose exec front sh
