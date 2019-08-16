const tap = require('tap');
const webIconScraper = require('./../index');

webIconScraper({
  url: 'https://reactjs.org/',
  sort: 'des'
}).then(result => {
  const mock = {
    icons: [
      {
        type: 'favicon',
        size: undefined,
        link: 'https://reactjs.org/favicon.ico'
      },
    ]
  };
  tap.equal(mock.icons[0].type, result.icons[0].type);
  tap.equal(mock.icons[0].link, result.icons[0].link);
});

// --- wanted                                                          
// +++ found                                                           
// -www.sony.com.au/assets/images/apple-touch-icon-114x114.png         
// +https://www.sony.com.au/assets/images/apple-touch-icon-114x114.png

webIconScraper({
  url: 'https://www.sony.com.au/',
  sort: 'des'
}).then(result => {
  const mock = {
    icons: [
      {
        type: 'apple-touch-icon',
        size: 114,
        link: 'https://www.sony.com.au/assets/images/apple-touch-icon-114x114.png'
      },
    ]
  };
  tap.equal(mock.icons[0].type, result.icons[0].type);
  tap.equal(mock.icons[0].link, result.icons[0].link);
});

webIconScraper({
  url: 'https://github.com',
  sort: 'des'
}).then(result => {
  const mock = {
    icons: [
      {
        type: 'favicon',
        size: undefined,
        link: 'https://github.githubassets.com/favicon.ico'
      }
    ]
  };
  tap.equal(mock.icons[0].type, result.icons[0].type);
  tap.equal(mock.icons[0].link, result.icons[0].link);
});

webIconScraper({
  url: 'https://auspost.com.au/delivery-options',
  sort: 'des'
}).then(result => {
  const mock = {
    icons: [
      {
        type: 'apple-touch-icon',
        size: 144,
        link: 'https://content/dam/global/favicons/apple-touch-icon-144x144.png'
      },
    ]
  };
  tap.equal(mock.icons[0].type, result.icons[0].type);
  tap.equal(mock.icons[0].link, result.icons[0].link);
});

webIconScraper({
  url: 'https://www.ibm.com/au-en',
  sort: 'des'
}).then(result => {
  const mock = {
    icons: [
      {
        type: 'favicon',
        size: undefined,
        link: 'https://www.ibm.com/favicon.ico'
      }
    ]
  };
  tap.equal(mock.icons[0].type, result.icons[0].type);
  tap.equal(mock.icons[0].link, result.icons[0].link);
});

webIconScraper({
  url: 'https://www.bose.com.au/en_au/index.html',
  sort: 'des'
}).then(result => {
  const mock = {
    icons: [
      {
        type: 'favicon',
        size: undefined,
        link: 'https://static.bose.com/etc/designs/bose/consumer-products-2016/favicon.ico'
      },
    ]
  };
  tap.equal(mock.icons[0].type, result.icons[0].type);
  tap.equal(mock.icons[0].link, result.icons[0].link);
});

webIconScraper({
  url: 'https://momentjs.com',
  sort: 'des'
}).then(result => {
  const mock = {
    icons: [
      {
        type: 'favicon',
        size: undefined,
        link: 'https://momentjs.com/static/img/moment-favicon.png'
      }
    ]
  };
  tap.equal(mock.icons[0].type, result.icons[0].type);
  tap.equal(mock.icons[0].link, result.icons[0].link);
});

webIconScraper({
  url: 'https://slack.com/intl/en-au/',
  sort: 'des'
}).then(result => {
  const mock = {
    icons: [
      {
        type: 'favicon',
        size: 48,
        link: 'https://a.slack-edge.com/4a5c4/marketing/img/meta/favicon-32.png'
      }
    ]
  };
  tap.equal(mock.icons[0].type, result.icons[0].type);
  tap.equal(mock.icons[0].link, result.icons[0].link);
});


