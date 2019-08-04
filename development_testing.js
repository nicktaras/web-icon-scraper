const IconWebScrapper = require('./index');

IconWebScrapper({
  url: 'https://github.com',
  sort: 'des'
}).then(result => {
  console.log(result);
});