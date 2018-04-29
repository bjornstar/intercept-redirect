const assert = require('assert');

const analyzeURL = require('./src/background.js').analyzeURL;

const testURLs = [
  {
    src: 'https://t.umblr.com/redirect?z=http%3A%2F%2Fwww.theguardian.com%2Fnews%2F2018%2Fapr%2F19%2Fwolves-of-instagram-jordan-belmont-social-media-traders',
    dst: 'http://www.theguardian.com/news/2018/apr/19/wolves-of-instagram-jordan-belmont-social-media-traders'
  }
];

testURLs.forEach(function (url) {
  const redirectUrl = url.dst;
  assert.deepEqual(analyzeURL({ url: url.src }), { redirectUrl })
});
