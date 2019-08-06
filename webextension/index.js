// URL polyfill
const URL = typeof window === 'object' ? window.URL : require('url').URL;

const googlePathnames = {
  '/imgres': ['imgurl','imgrefurl'],
  '/url': ['q','url']
};

const sites = {
  // 2018-08-19 -- https://wow.curseforge.com/linkout?remoteUrl=http%253a%252f%252fi.imgur.com%252f1AjSgEH.png
  '*.curseforge.com': {
    pathnames: {
      '/linkout': ['remoteUrl']
    },
    extra: function (s = '') {
      return decodeURIComponent(s);
    }
  },
  '*.digidip.net': {
    pathnames: {
      '/visit': ['url']
    }
  },
  'disq.us': {
    pathnames: {
      '/url': ['url']
    },
    extra: function (s = '') {
      return s.substring(0, s.lastIndexOf(':'));
    }
  },
  'exit.sc': {
    pathnames: {
      '/': ['url']
    }
  },
  'l.facebook.com': {
    pathnames: {
      '/l.php': ['u']
    }
  },
  // 2019-08-06 - https://gate.sc/?url=http%3A%2F%2Ffanlink.to%2FPartial7&token=10fd54-1-1565068249069
  'gate.sc': {
    pathnames: { '/': ['url'] }
  },
  'www.google.co.jp': {
    pathnames: googlePathnames
  },
  'news.url.google.com': {
    pathnames: {
      '/url': ['url']
    }
  },
  'plus.url.google.com': {
    pathnames: {
      '/url': ['url']
    }
  },
  'www.google.com': {
    pathnames: googlePathnames
  },
  'l.instagram.com': {
    pathnames: {
      '/': ['u']
    }
  },
  'l.messenger.com': {
    pathnames: {
      '/l.php': ['u']
    }
  },
  'slack-redir.net': {
    pathnames: {
      '/link': ['url']
    }
  },
  'steamcommunity.com': {
    pathnames: {
      '/linkfilter/': ['url']
    }
  },
  'twitter.com': {
    pathnames: {
      '/i/redirect': ['url']
    }
  },
  't.umblr.com': {
    pathnames: {
      '/redirect': ['z']
    }
  },
  'vk.com': {
    pathnames: {
      '/away.php': ['to']
    }
  },
  'workable.com': {
    pathnames: {
      '/nr': ['l']
    }
  },
  'www.youtube.com': {
    pathnames: {
      '/redirect': ['q']
    }
  }
};

const domains = [
  'curseforge.com',
  'digidip.net'
];

function subdomain(host) {
  const hostLength = host.length;

  for (let i = 0; i < domains.length; i += 1) {
    const domain = domains[i];
    const expectedIndex = hostLength - domain.length;

    if (expectedIndex > 0 && host.lastIndexOf(domain) === expectedIndex) {
      return `*.${domain}`;
    }
  }
  return host;
}

function reduceKeyValues(o, pair) {
  const [k, v] = pair.split('=');
  o[k] = decodeURIComponent(v);
  return o;
}

function findKey(o, keys = []) {
  for (let i = 0; i < keys.length; i += 1) {
    if (o.hasOwnProperty(keys[i])) {
      return o[keys[i]];
    }
  }
}

function analyzeURL(request) {
  const url = new URL(request.url);
  const host = subdomain(url.host);

  const site = sites[host];

  if (!site) {
    return;
  }

  const { pathname, search } = url;
  const keys = site.pathnames[pathname];
  const pairs = search.slice(1).split('&');

  const q = pairs.reduce(reduceKeyValues, {});
  const value = findKey(q, keys);

  const redirectUrl = (site.extra && site.extra(value)) || value;

  return redirectUrl && { redirectUrl };
}

function reduceSites(urls, host) {
  return urls.concat(Object.keys(sites[host].pathnames).map(function (pathname) {
    return `*://${host}${pathname}*`;
  }));
}

const urls = Object.keys(sites).reduce(reduceSites, []);

// Only runs in the browser
typeof chrome === 'object' && chrome.webRequest.onBeforeRequest.addListener(analyzeURL, { urls }, ['blocking']);

typeof exports === 'object' && Object.assign(exports, {
  analyzeURL,
  sites,
  subdomain
});
