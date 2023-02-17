const assert = require('assert');
const fs = require('fs');
const mocha = require('mocha');
const path = require('path');
const { URL } = require('url');

const webExtension = require('../webextension');
const manifest = require('../webextension/manifest.json');
const pkg = require('../package.json');

const { describe, it } = mocha;
const { analyzeURL, subdomain } = webExtension;

const redirectUrl = 'https://bjornstar.com/intercept-redirect';
const encodedURL = encodeURIComponent(redirectUrl);

const urls = [
  { url: `https://c212.net/c/link/?u=${redirectUrl}`},
  // curseforge double URI encodes
  { url: `https://wow.curseforge.com/linkout?remoteUrl=${encodeURIComponent(redirectUrl)}` },
  { url: `https://clickserve.dartsearch.net/link/click?ds_dest_url=${encodedURL}` },
  { url: 'https://github-redirect.dependabot.com/bjornstar/intercept-redirect', redirectUrl: 'https://github.com/bjornstar/intercept-redirect' },
  { url: `https://bjornstar.digidip.net/visit?url=${redirectUrl}` },
  { url: `https://disq.us/url?url=${redirectUrl}%3AzjHJ9CS7YTS6D6-FWtZRTF8swk4` },
  { url: `https://cj.dotomi.com/links-t/8961927/type/dlg/sid/wtbs_61d0bb4f5c0a800d5c6d18c7/${redirectUrl}`},
  { url: `https://console.ebsta.com/linktracking/track.aspx?linkuri=${encodedURL}` },
  { url: `https://redirect.epicgames.com/en/?redirectTo=${redirectUrl}`},
  { url: `https://exit.sc/?url=${encodedURL}` },
  { url: `https://facebook.com/flx/warn/?u=${encodedURL}` },
  { url: `https://l.facebook.com/l.php?u=${encodedURL}` },
  { url: `https://lm.facebook.com/l.php?u=${encodedURL}` },
  { url: `https://m.facebook.com/flx/warn/?u=${encodedURL}` },
  { url: `https://gate.sc/?url=${encodedURL}` },
  { url: `https://www.google.co.jp/imgres?imgrefurl=${encodedURL}` },
  { url: `https://www.google.co.jp/imgres?imgurl=${encodedURL}` },
  { url: `https://www.google.co.jp/url?q=${encodedURL}` },
  { url: `https://www.google.co.jp/url?url=${encodedURL}` },
  { url: `https://news.url.google.com/url?url=${encodedURL}` },
  { url: `https://plus.url.google.com/url?url=${encodedURL}` },
  { url: `https://www.google.com/imgres?imgrefurl=${encodedURL}` },
  { url: `https://www.google.com/imgres?imgurl=${encodedURL}` },
  { url: `https://www.google.com/sorry/index?continue=${encodedURL}`},
  { url: `https://www.google.com/url?q=${encodedURL}` },
  { url: `https://www.google.com/url?url=${encodedURL}` },
  { url: `https://www.google.se/imgres?imgrefurl=${encodedURL}` },
  { url: `https://www.google.se/imgres?imgurl=${encodedURL}` },
  { url: `https://www.google.se/url?q=${encodedURL}` },
  { url: `https://www.google.se/url?url=${encodedURL}` },
  { url: `https://www.googleadservices.com/pagead/aclk?adurl=${encodedURL}` },
  { url: `https://href.li/?${redirectUrl}` },
  { url: `https://l.instagram.com/?u=${encodedURL}` },
  { url: `https://www.javlibrary.com/cn/redirect.php?url=${encodedURL}` },
  { url: `https://www.javlibrary.com/en/redirect.php?url=${encodedURL}` },
  { url: `https://www.javlibrary.com/ja/redirect.php?url=${encodedURL}` },
  { url: `https://www.javlibrary.com/tw/redirect.php?url=${encodedURL}` },
  { url: `https://r.klar.na/?to=${encodedURL}` },
  { url: `https://www.kraken.com/redirect?url=${encodedURL}` },
  { url: `https://t.lever-analytics.com/email-link?dest=${encodedURL}` },
  { url: `https://www.linkedin.com/safety/go?url=${encodedURL}` },
  { url: `https://l.messenger.com/l.php?u=${encodedURL}` },
  { url: `https://outgoing.prod.mozaws.net/v1/08aa3089688d4b6ec460e6c402e78eba305c36fb81287197e4ae3f5a5c60f22d/${encodedURL}` },
  // https://github.com/bjornstar/intercept-redirect/issues/22
  { url: 'https://outgoing.prod.mozaws.net/v1/08aa3089688d4b6ec460e6c402e78eba305c36fb81287197e4ae3f5a5c60f22d/https%3A//bjornstar.com/intercept-redirect' },
  { url: `https://onlyfans.com/away?url=${encodedURL}` },
  { url: `https://eur03.safelinks.protection.outlook.com/?url=${encodedURL}` },
  { url: `https://gcc01.safelinks.protection.outlook.com/?url=${encodedURL}` },
  { url: `https://slack-redir.net/link?url=${encodedURL}` },
  { url: `https://steamcommunity.com/linkfilter/?url=${encodedURL}` },
  // https://github.com/bjornstar/intercept-redirect/issues/12
  { url: 'https://steamcommunity.com/linkfilter/?url=bjornstar.com/intercept-redirect' },
  { url: `https://twitter.com/i/redirect?url=${encodedURL}` },
  { url: `https://t.umblr.com/redirect?z=${encodedURL}` },
  { url: `https://vk.com/away.php?to=${encodedURL}` },
  { url: `https://workable.com/nr?l=${encodedURL}` },
  { url: `https://www.youtube.com/redirect?q=${encodedURL}` }
];

const manifestSites = manifest.permissions.filter(permission => {
  return permission !== 'webRequest' && permission !== 'webRequestBlocking';
}).map(site => new URL(site.replace(/^\*:\/\//, 'https://')).host);

const testSites = urls.map(({ url }) => {
  const host = url.substring(8, url.indexOf('/', 8));
  return subdomain(host);
});

const webExtensionSites = Object.keys(webExtension.sites);

describe('analyzeURL', () => {
  describe('Each URL redirects to the correct location', () => {
    const expectedUrl = redirectUrl;
    urls.forEach(({ redirectUrl = expectedUrl, url }) => {
      it(`url: ${url}`, () => {
        assert.deepStrictEqual(analyzeURL({ url }), { redirectUrl });
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
    assert.strictEqual(manifest.version, pkg.version);
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
          assert.strictEqual(line.indexOf(versionLine), 0, `Package: ${versionLine}, Latest CHANGELOG: ${line}`);
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
    assert.strictEqual(subdomain('wow.curseforge.com'), '*.curseforge.com');
    assert.strictEqual(subdomain('foobar.digidip.net'), '*.digidip.net');
    assert.strictEqual(subdomain('foo.bar.digidip.net'), '*.digidip.net');
    assert.strictEqual(subdomain('bjo01.safelinks.protection.outlook.com'), '*.safelinks.protection.outlook.com');
  });

  it('Does not apply to domain host', () => {
    assert.strictEqual(subdomain('digidip.net'), 'digidip.net');
    assert.strictEqual(subdomain('curseforge.com'), 'curseforge.com');
    assert.strictEqual(subdomain('safelinks.protection.outlook.com'), 'safelinks.protection.outlook.com');
  });

  it('Returns host when not supported', () => {
    assert.strictEqual(subdomain('intercept-redirect.bjornstar.com'), 'intercept-redirect.bjornstar.com');
    assert.strictEqual(subdomain('bjornstar.com'), 'bjornstar.com');
  });
});
