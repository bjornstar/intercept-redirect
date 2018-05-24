const assert = require('assert');
const fs = require('fs');
const mocha = require('mocha');
const path = require('path');

const webExtension = require('../webextension');
const manifest = require('../webextension/manifest.json');
const pkg = require('../package.json');

const { describe, it } = mocha;
const { analyzeURL, subdomain } = webExtension;

const urls = [
  'https://bjornstar.digidip.net/visit?url=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
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
  const host = url.substring(8, url.indexOf('/', 8));
  return subdomain(host);
});

const webExtensionSites = Object.keys(webExtension.sites);

describe('analyzeURL', function () {
  describe('Each URL redirects to the correct location', function () {
    urls.forEach(function (url) {
      it(`url: ${url}`, function () {
        assert.deepEqual(analyzeURL({ url }), { redirectUrl });
      });
    });
  });

  describe('No redirect for sites that are implemented but the URLs do not match', function () {
    const url = 'https://www.google.com/';

    it(`url: ${url}`, function () {
      assert.ok(!analyzeURL({ url }));
    });
  });

  describe('No redirect for sites that are not implemented', function () {
    const url = 'https://bjornstar.com/';

    it(`url: ${url}`, function () {
      assert.ok(!analyzeURL({ url }));
    });
  });
});

describe('Packaging', function () {
  describe('Every site implemented in the webExtension is in the manifest permissions', function () {
    webExtensionSites.forEach(function (site) {
      it(`site: ${site}`, function () {
        assert.ok(manifestSites.indexOf(site) !== -1, `Unmatched: ${site}`);
      });
    });
  });

  describe('Every site in the manifest permissions is implemented in the webExension', function () {
    manifestSites.forEach(function (site) {
      it (`site: ${site}`, function () {
        assert.ok(webExtensionSites.indexOf(site) !== -1, `Unmatched: ${site}`);
      });
    });
  });

  describe('Every site implemented in the webExtension has a test', function () {
    manifestSites.forEach(function (site) {
      it(`site: ${site}`, function () {
        assert.ok(testSites.indexOf(site) !== -1, `Missing tests: ${site}`);
      });
    });
  })

  it('Version number is the same in both the package and manifest', function () {
    assert.equal(manifest.version, pkg.version);
  });

  it('The CHANGELOG has an entry for the current version', function (done) {
    fs.readFile(path.resolve('./CHANGELOG.md'), 'utf8', function (error, changelog) {
      if (error) {
        return done(error);
      }

      const lines = changelog.split('\n');
      const versionRe = /^## v\d+\.\d+\.\d+/;
      const versionLine = `## v${pkg.version}`;

      for (var i = 0; i < lines.length; i += 1) {
        const line = lines[i];

        if (versionRe.test(line)) {
          assert.equal(line.indexOf(versionLine), 0, `Package: ${versionLine}, Latest CHANGELOG: ${line}`)
          return done()
        }
      }

      done(new Error('No version found in CHANGELOG'));
    });
  });
});

describe('Subdomain', function () {
  it(`For supported domains returns *.domain`, function () {
    assert.equal(subdomain('foobar.digidip.net'), '*.digidip.net');
    assert.equal(subdomain('foo.bar.digidip.net'), '*.digidip.net');
  });

  it('Does not apply to domain host', function () {
    assert.equal(subdomain('digidip.net'), 'digidip.net');
  });

  it('Returns host when not supported', function () {
    assert.equal(subdomain('intercept-redirect.bjornstar.com'), 'intercept-redirect.bjornstar.com');
    assert.equal(subdomain('bjornstar.com'), 'bjornstar.com');
  });
});
