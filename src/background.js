// For node compatibility so we can test.
const URL = typeof window === 'undefined' ? require('url').URL : window.URL;

const sites = {
  'disq.us': {
    pathnames: {
      '/url': 'url'
    },
    extra: function (s) {
      return s.substring(0, s.lastIndexOf(':'));
    }
  },
  'exit.sc': {
    pathnames: {
      '/': 'url'
    }
  },
  'l.facebook.com': {
    pathnames: {
      '/l.php': 'u'
    }
  },
  'www.google.co.jp': {
    pathnames: {
      '/imgres': 'imgurl',
      '/url': 'url'
    }
  },
  'news.url.google.com': {
    pathnames: {
      '/url': 'url'
    }
  },
  'plus.url.google.com': {
    pathnames: {
      '/url': 'url'
    }
  },
  'www.google.com': {
    pathnames: {
      '/imgres': 'imgurl',
      '/url': 'url'
    }
  },
  'l.instagram.com': {
    pathnames: {
      '/': 'u'
    }
  },
  'l.messenger.com': {
    pathnames: {
      '/l.php': 'u'
    }
  },
  'slack-redir.net': {
    pathnames: {
      '/link': 'url'
    }
  },
  'steamcommunity.com': {
    pathnames: {
      '/linkfilter/': 'url'
    }
  },
  't.umblr.com': {
    pathnames: {
      '/redirect': 'z'
    }
  },
  'vk.com': {
    pathnames: {
      '/away.php': 'to'
    }
  },
  'www.youtube.com': {
    pathnames: {
      '/redirect': 'q'
    }
  }
};

function siteReducer(urls, host) {
  return urls.concat(Object.keys(sites[host].pathnames).map(function (pathname) {
    return `*://${host}${pathname}*`;
  }));
}

const urls = Object.keys(sites).reduce(siteReducer, []);

function analyzeURL(request) {
  const url = new URL(request.url);
  const site = sites[url.host];
  const key = site.pathnames[url.pathname];

  const pairs = url.search.slice(1).split('&');

  const q = pairs.reduce((o, pair) => {
    const [k, v] = pair.split('=');
    o[k] = decodeURIComponent(v);
    return o;
  }, {});

  const redirectUrl = (!site.extra && q[key]) || site.extra(q[key] || '');

  return redirectUrl && { redirectUrl };
}

// For node compatibility so we can test.
typeof chrome === 'object' && chrome.webRequest.onBeforeRequest.addListener(analyzeURL, { urls }, ['blocking']);

// For node compatibility so we can test.
typeof exports === 'object' && Object.assign(exports, {
  analyzeURL,
  siteReducer,
  sites
});
