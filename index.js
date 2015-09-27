var probable = require('probable');
var callNextTick = require('call-next-tick');
var Twit = require('twit');
var async = require('async');
var _ = require('lodash');

function getPopularTweets(opts, popularTweetsDone) {
  var twitterCreds;
  var woeid;

  if (opts) {
    twitterCreds = opts.twitterCreds;
    woeid = opts.woeid;
  }

  if (!woeid) {
    // WOEID 1 is 'Worldwide'.
    woeid = 1;
  }

  var twit = new Twit(twitterCreds);

  async.waterfall(
    [
      getTrends,
      pickTrend,
      searchTrend
    ],
    popularTweetsDone
  );

  function getTrends(done) {
    var params = {
      id: woeid
    };
    twit.get('trends/place', params, done);
  }

  function pickTrend(data, response, done) {
    var trend = probable.pickFromArray(data[0].trends);
    callNextTick(done, null, trend);
  }

  function searchTrend(trend, done) {
    var params = {
      q: trend.name,
      result_type: 'popular'
    };
    twit.get('search/tweets', params, done);
  }
}

module.exports = getPopularTweets;
