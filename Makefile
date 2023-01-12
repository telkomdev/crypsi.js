.PHONY : build-ts build-browser clean format lint prepare

build-ts:
	@echo 'compiling typescript project'
	npm run build:ts

build-browser-dev:
	@echo 'build crypsi for browser: dev'
	npm run build:browser:dev

build-browser-prod:
	@echo 'build crypsi for browser: prod'
	npm run build:browser:prod

format:
	@echo 'format code with prettier'
	npm run prettier-format

lint:
	@echo 'execute linter'
	npm run lint
