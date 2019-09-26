const webIconScraper = require('./index');

webIconScraper({
  url: 'https://swedishhousemafia.com/',
  sort: 'des',
  limit: 1,
  checkStatus: false
}).then(result => {
  console.log(result);
}, err => {
  console.log(err);
});

