const webIconScraper = require('./index');

webIconScraper({
  url: 'https://momentjs.com',
  sort: 'des',
  limit: 1
}).then(result => {
  console.log(result);
}, err => {
  console.log(err);
});

