var getPopularTweets = require('../index');
var config = require('../config');

var opts = {
  twitterCreds: config.twitter,
  woeid: 23424977 // US
};

getPopularTweets(opts, logTweets);

function logTweets(error, tweets) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(JSON.stringify(tweets, null, '  '));
  }
}
