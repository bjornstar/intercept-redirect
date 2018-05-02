// For node compatibility so we can test.
const URL = typeof window === 'undefined' ? require('url').URL : window.URL;

const googlePathnames = {
  '/imgres': ['imgurl','imgrefurl'],
  '/url': ['q','url']
};

const sites = {
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
  'www.youtube.com': {
    pathnames: {
      '/redirect': ['q']
    }
  }
};

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
  const site = sites[url.host];

  if (!site) {
    return;
  }

  const keys = site.pathnames[url.pathname];
  const pairs = url.search.slice(1).split('&');

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

// For node compatibility so we can test.
typeof chrome === 'object' && chrome.webRequest.onBeforeRequest.addListener(analyzeURL, { urls }, ['blocking']);

// For node compatibility so we can test.
typeof exports === 'object' && Object.assign(exports, {
  analyzeURL,
  sites
});
