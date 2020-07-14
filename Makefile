.PHONY: help
help:
	@echo "dep: download dependent packages"
	@echo "run: run web app"
	@echo "build: create a production build"

.PHONY: dep
dep:
	@npm install
	@npm audit fix

.PHONY: run
run:
	@npm start

.PHONY: build
	@npm run build
