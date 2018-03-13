const sites = {
  'exit.sc': function (q) {
    return q.url;
  },
  'l.facebook.com': function (q) {
    return q.u;
  },
  'www.google.com': function (q) {
    return q.url;
  },
  'l.instagram.com': function (q) {
    return q.u;
  },
  'l.messenger.com': function (q) {
    return q.u;
  },
  'slack-redir.net': function (q) {
    return q.url;
  },
  'steamcommunity.com': function (q) {
    return q.url;
  },
  't.umblr.com': function (q) {
    return q.z;
  },
  'vk.com': function (q) {
    return q.to;
  },
  'www.youtube.com': function (q) {
    return q.q;
  }
};

const urls = [
  'https://exit.sc/*',
  'https://l.facebook.com/l.php*',
  'https://www.google.com/url*',
  'https://l.instagram.com/*',
  'https://l.messenger.com/l.php*',
  'https://slack-redir.net/link*',
  'https://steamcommunity.com/linkfilter/*',
  'https://t.umblr.com/redirect*',
  'https://vk.com/away.php*',
  'https://www.youtube.com/redirect*'
];

chrome.webRequest.onBeforeRequest.addListener(function(request) {
  const url = new URL(request.url);
  const pairs = url.search.slice(1).split('&');

  const q = pairs.reduce((o, pair) => {
    const [k, v] = pair.split('=');
    o[k] = decodeURIComponent(v);
    return o;
  }, {});

  const redirectUrl = sites[url.host](q);

  if (redirectUrl) {
    return { redirectUrl };
  }
}, { urls }, ['blocking']);
