const sites = {
  'disq.us': {
    pathname: 'url',
    key: 'url'
  },
  'exit.sc': {
    pathname: '',
    key: 'url'
  },
  'l.facebook.com': {
    pathname: 'l.php',
    key: 'u'
  },
  'news.url.google.com': {
    pathname: 'url',
    key: 'url'
  },
  'plus.url.google.com': {
    pathname: 'url',
    key: 'url'
  },
  'www.google.com': {
    pathname: 'url',
    key: 'url'
  },
  'l.instagram.com': {
    pathname: '',
    key: 'u'
  },
  'l.messenger.com': {
    pathname: 'l.php',
    key: 'u'
  },
  'slack-redir.net': {
    pathname: 'link',
    key: 'url'
  },
  'steamcommunity.com': {
    pathname: 'linkfilter/',
    key: 'url'
  },
  't.umblr.com': {
    pathname: 'redirect',
    key: 'z'
  },
  'vk.com': {
    pathname: 'away.php',
    key: 'to'
  },
  'www.youtube.com': {
    pathname: 'redirect',
    key: 'q'
  }
};

const urls = Object.keys(sites).map(function(host) {
  return `https://${host}/${sites[host].pathname}*`;
});

chrome.webRequest.onBeforeRequest.addListener(function(request) {
  const url = new URL(request.url);
  const site = sites[url.host];

  const pairs = url.search.slice(1).split('&');

  const q = pairs.reduce((o, pair) => {
    const [k, v] = pair.split('=');
    o[k] = decodeURIComponent(v);
    return o;
  }, {});

  const redirectUrl = q[site.key];

  if (redirectUrl) {
    return { redirectUrl };
  }
}, { urls }, ['blocking']);
