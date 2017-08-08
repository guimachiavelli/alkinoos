.PHONY: dev build
BIN=node_modules/.bin

dev:
	$(BIN)/webpack-dev-server --env.dev	--host gui.local

build:
	$(BIN)/webpack

lint:
	$(BIN)/eslint './src/**' --ignore-pattern '*.scss' --ignore-pattern '*.woff*'
