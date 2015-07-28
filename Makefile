SRC = index.js

default:
	@echo "No default task"

test:
	@./node_modules/.bin/mocha --harmony test

coverage:
	@node --harmony ./node_modules/istanbul-harmony/lib/cli cover --harmony ./node_modules/.bin/_mocha test

include node_modules/make-lint/index.mk
