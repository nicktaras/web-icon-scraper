const tap = require('tap');
const IconWebScrapper = require('./../index');

IconWebScrapper({
  url: 'https://github.com',
  sort: 'des'
}).then(result => {
  tap.equal(
    [
      {
        type: 'favicon',
        size: undefined,
        link: 'https://github.githubassets.com/favicon.ico'
      }
    ].toString(),
    result.toString()
  )
});
