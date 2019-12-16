const webIconScraper = require('./index');

webIconScraper({
  url: 'https://angular.io/',
  sort: 'des',
  limit: 1,
  checkStatus: true,
  followRedirectsCount: 5
}).then(result => {
  console.log('res', JSON.stringify(result));
}, err => {
  console.log('err', err);
});

