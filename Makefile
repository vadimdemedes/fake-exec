SRC = index.js

test:
	@./node_modules/.bin/mocha --harmony test

include node_modules/make-lint-es6/index.mk
