
test:
	@./node_modules/.bin/mocha --reporter list $(TESTFLAGS)

.PHONY: test
