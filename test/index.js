const tap = require('tap');
const webIconScraper = require('./../index');

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
  tap.equal(mock.icons.length, result.icons.length);
  tap.equal(mock.icons[0].type, result.icons[0].type);
  tap.equal(mock.icons[0].link, result.icons[0].link);
});

