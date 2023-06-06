# help ターゲットをデフォルトのターゲットにする
.DEFAULT_GOAL := help

# env
ENV_LOCAL_FILE := .env.local
ENV_LOCAL       = $(shell cat $(ENV_LOCAL_FILE))

ENV_SAMPLE_FILE = .env.db.sample
ENV_SAMPLE       = $(shell cat $(ENV_SAMPLE_FILE))


# go
GO           := go run

# docker
DOCKER_FILE_DIR                 := ./docker/dev
DOCKER_FILE_CI_DIR              := ./docker/ci
DOCKER_COMPOSE_CI 				:= $(DOCKER_FILE_CI_DIR)/docker-compose.ci.yml
DOCKER_COMPOSE_LOCAL            := $(DOCKER_FILE_DIR)/docker-compose.local.yml
DOCKER_COMPOSE_LOCAL_DATABASE   := $(DOCKER_FILE_DIR)/docker-compose.local.database.yml
DOCKER_COMPOSE_CI_DATABASE   	:= $(DOCKER_FILE_CI_DIR)/docker-compose.ci.database.yml
DOCKER_COMPOSE_LOCAL_SERVER     := $(DOCKER_FILE_DIR)/docker-compose.local.server.yml
DOCKER_EXEC                     := docker exec -it
GITHUB_REPOSITORY_NAME          := glyph
DB_CONTAINER_NAME               := $(GITHUB_REPOSITORY_NAME)-database

# dir
DATA_DIR := ./database/data

# rm
RM:=rm -rf

.PHONY: up
up: ## docker環境を立ち上げる
	$(ENV_LOCAL) docker-compose \
	-f $(DOCKER_COMPOSE_LOCAL) \
	-f $(DOCKER_COMPOSE_LOCAL_DATABASE) \
	-f $(DOCKER_COMPOSE_LOCAL_SERVER) up -d

.PHONY: down
down: ## dockerイメージを削除し、docker環境を閉じる
	docker-compose \
	-f $(DOCKER_COMPOSE_LOCAL) \
	-f $(DOCKER_COMPOSE_LOCAL_DATABASE) \
	-f $(DOCKER_COMPOSE_LOCAL_SERVER) down \
	--rmi all --volumes --remove-orphans

.PHONY: fclean
fclean:down del-volumes ## マウントしたデータを削除、またdockerイメージも削除する

.PHONY: re
re:fclean up sleep migrate## 完全に初期化した状態でdocker環境を立ち上げる

.PHONY: run-db
run-db: 
	$(ENV_SAMPLE) docker-compose \
	-f $(DOCKER_COMPOSE_CI) \
	-f $(DOCKER_COMPOSE_CI_DATABASE) -p local up -d


.PHONY: del-volumes
del-volumes:del-data

.PHONY: del-data
del-data:
	$(RM) $(DATA_DIR)

.PHONY: migrate
migrate: ## dbのマイグレーションを行う
	migrate -path migrations -database='mysql://hoge:hoge@tcp(127.0.0.1:3306)/hoge?parseTime=true&collation=utf8mb4_bin' --verbose up


.PHONY: attach-db
attach-db: ## dockerのdbコンテナにアクセスする
	$(DOCKER_EXEC) $(DB_CONTAINER_NAME) bash

.PHONY: lint
lint: ## goのコードを整形する
	gofmt -l -w .

.PHONY: deploy
deploy:


.PHONY: help
help: ## コマンドの一覧を標示する
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

sleep:
	sleep 30