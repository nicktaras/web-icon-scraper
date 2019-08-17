const webIconScraper = require('./index');

webIconScraper({
  url: 'https://www.apple.com/au/',
  sort: 'des',
  limit: 1
}).then(result => {
  console.log(result);
}, err => {
  console.log(err);
});

