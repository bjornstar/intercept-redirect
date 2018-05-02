const tap = require('tap');

const webExtension = require('../webextension');
const manifest = require('../webextension/manifest.json');
const package = require('../package.json');

const { analyzeURL } = webExtension;

const urls = [
  'https://disq.us/url?url=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect%3AzjHJ9CS7YTS6D6-FWtZRTF8swk4',
  'https://exit.sc/?url=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://l.facebook.com/l.php?u=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://www.google.co.jp/imgres?imgrefurl=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://www.google.co.jp/imgres?imgurl=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://www.google.co.jp/url?q=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://www.google.co.jp/url?url=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://news.url.google.com/url?url=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://plus.url.google.com/url?url=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://www.google.com/imgres?imgrefurl=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://www.google.com/imgres?imgurl=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://www.google.com/url?q=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://www.google.com/url?url=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://l.instagram.com/?u=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://l.messenger.com/l.php?u=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://slack-redir.net/link?url=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://steamcommunity.com/linkfilter/?url=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://twitter.com/i/redirect?url=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://t.umblr.com/redirect?z=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://vk.com/away.php?to=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://www.youtube.com/redirect?q=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect'
];

const redirectUrl = 'https://bjornstar.com/intercept-redirect';

const manifestSites = manifest.permissions.filter(function (permission) {
  return permission !== 'webRequest' && permission !== 'webRequestBlocking';
}).map(function (site) {
  return site.replace('*://', '').replace('/', '');
});

const testSites = urls.map(function (url) {
  return url.substring(8, url.indexOf('/', 8));
});

const webExtensionSites = Object.keys(webExtension.sites);

urls.forEach(function (url) {
  tap.same(analyzeURL({ url }), { redirectUrl }, `Source: ${url}`);
});

webExtensionSites.forEach(function (site) {
  tap.ok(manifestSites.indexOf(site) !== -1, `Unmatched: ${site}`);
});

manifestSites.forEach(function (site) {
  tap.ok(webExtensionSites.indexOf(site) !== -1, `Unmatched: ${site}`);
});

manifestSites.forEach(function (site) {
  tap.ok(testSites.indexOf(site) !== -1, `Missing tests: ${site}`);
});

tap.notOk(analyzeURL({ url: 'https://www.google.com/' }));
tap.notOk(analyzeURL({ url: 'https://bjornstar.com/' }));

tap.equal(manifest.version, package.version);
