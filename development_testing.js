const webIconScraper = require('./index');

webIconScraper({
  url: 'https://reactjs.org/',
  sort: 'des'
}).then(result => {
  console.log(result);
}, err => {
  console.log(err);
});