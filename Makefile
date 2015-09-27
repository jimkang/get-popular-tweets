run:
	node tools/run-get-popular-tweets.js

pushall:
	git push origin master && npm publish
