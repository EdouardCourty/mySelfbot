start:
	node app.js

setup:
	touch .env
	echo 'APPLICATION_TOKEN = ""\n\nCOMMAND_PREFIX = "!"\n\nAPPLICATION_LOGLEVEL = "all"' >> .env
	npm install

test:
	node data/tester.js