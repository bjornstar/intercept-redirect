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
  'https://wow.curseforge.com/linkout?remoteUrl=https%253A%252F%252Fbjornstar.com%252Fintercept-redirect', // curseforge double URI encodes
  'https://disq.us/url?url=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect%3AzjHJ9CS7YTS6D6-FWtZRTF8swk4',
  'https://console.ebsta.com/linktracking/track.aspx?linkuri=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://exit.sc/?url=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://l.facebook.com/l.php?u=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://gate.sc/?url=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
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
  'https://www.javlibrary.com/en/redirect.php?url=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://l.messenger.com/l.php?u=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://outgoing.prod.mozaws.net/v1/08aa3089688d4b6ec460e6c402e78eba305c36fb81287197e4ae3f5a5c60f22d/https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://gcc01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://slack-redir.net/link?url=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://steamcommunity.com/linkfilter/?url=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://twitter.com/i/redirect?url=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://t.umblr.com/redirect?z=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://vk.com/away.php?to=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://workable.com/nr?l=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect',
  'https://www.youtube.com/redirect?q=https%3A%2F%2Fbjornstar.com%2Fintercept-redirect'
];

const redirectUrl = 'https://bjornstar.com/intercept-redirect';

const manifestSites = manifest.permissions.filter(permission => {
  return permission !== 'webRequest' && permission !== 'webRequestBlocking';
}).map(site => {
  return site.replace('*://', '').replace('/', '');
});

const testSites = urls.map(url => {
  const host = url.substring(8, url.indexOf('/', 8));
  return subdomain(host);
});

const webExtensionSites = Object.keys(webExtension.sites);

describe('analyzeURL', () => {
  describe('Each URL redirects to the correct location', () => {
    urls.forEach(url => {
      it(`url: ${url}`, () => {
        assert.deepEqual(analyzeURL({ url }), { redirectUrl });
      });
    });
  });

  describe('No redirect for sites that are implemented but the URLs do not match', () => {
    const url = 'https://www.google.com/';

    it(`url: ${url}`, () => {
      assert.ok(!analyzeURL({ url }));
    });
  });

  describe('No redirect for sites that are not implemented', () => {
    const url = 'https://bjornstar.com/';

    it(`url: ${url}`, () => {
      assert.ok(!analyzeURL({ url }));
    });
  });
});

describe('Packaging', () => {
  describe('Every site implemented in the webExtension is in the manifest permissions', () => {
    webExtensionSites.forEach(site => {
      it(`site: ${site}`, () => {
        assert.ok(manifestSites.indexOf(site) !== -1, `Unmatched: ${site}`);
      });
    });
  });

  describe('Every site in the manifest permissions is implemented in the webExtension', () => {
    manifestSites.forEach(site => {
      it (`site: ${site}`, () => {
        assert.ok(webExtensionSites.indexOf(site) !== -1, `Unmatched: ${site}`);
      });
    });
  });

  describe('Every site implemented in the webExtension has a test', () => {
    manifestSites.forEach(site => {
      it(`site: ${site}`, () => {
        assert.ok(testSites.includes(site), `Missing tests: ${site}`);
      });
    });
  });

  it('Version number is the same in both the package and manifest', () => {
    assert.equal(manifest.version, pkg.version);
  });

  it('The CHANGELOG has an entry for the current version', done => {
    fs.readFile(path.resolve('./CHANGELOG.md'), 'utf8', (error, changelog) => {
      if (error) return done(error);

      const lines = changelog.split('\n');
      const versionRe = /^## v\d+\.\d+\.\d+/;
      const versionLine = `## v${pkg.version}`;

      for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i];

        if (versionRe.test(line)) {
          assert.equal(line.indexOf(versionLine), 0, `Package: ${versionLine}, Latest CHANGELOG: ${line}`);
          return done();
        }
      }

      done(new Error('No version found in CHANGELOG'));
    });
  });

  it('The README has an entry for every supported domain', done => {
    fs.readFile(path.resolve('./README.md'), 'utf8', (error, readme) => {
      if (error) return done(error);

      const lines = readme.split('\n');

      manifestSites.forEach(site => {
        assert.ok(lines.includes(`- ${site}`), `Missing site: ${site}`);
      });

      done();
    });
  });

  it('The manifest does not use tabs', done => {
    fs.readFile(path.resolve('./webextension/manifest.json'), 'utf8', (error, manifest) => {
      if (error) return done(error);

      const lines = manifest.split('\n');
      const whitespaceRe = /^(\s+)/;

      lines.forEach((line, index) => {
        const match = line.match(whitespaceRe);
        assert(!match || !match[0].includes('\t'), `Found a tab on line ${index+1}`);
      });

      done();
    });
  });
});

describe('Subdomain', () => {
  it('For supported domains returns *.domain', () => {
    assert.equal(subdomain('foobar.digidip.net'), '*.digidip.net');
    assert.equal(subdomain('foo.bar.digidip.net'), '*.digidip.net');
    assert.equal(subdomain('wow.curseforge.com'), '*.curseforge.com');
  });

  it('Does not apply to domain host', () => {
    assert.equal(subdomain('digidip.net'), 'digidip.net');
    assert.equal(subdomain('curseforge.com'), 'curseforge.com');
  });

  it('Returns host when not supported', () => {
    assert.equal(subdomain('intercept-redirect.bjornstar.com'), 'intercept-redirect.bjornstar.com');
    assert.equal(subdomain('bjornstar.com'), 'bjornstar.com');
  });
});
