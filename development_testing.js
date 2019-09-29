const webIconScraper = require('./index');

webIconScraper({
  url: 'https://www.google.com',
  sort: 'des',
  limit: 1,
  checkStatus: true
}).then(result => {
  console.log(result);
}, err => {
  console.log(err);
});

