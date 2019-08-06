const webIconScraper = require('./index');

// https://www.ibm.com/au-en
// https://dzone.com/articles/threejs-tutorial-example-webgl
// https://auspost.com.au/delivery-options
// https://www.firebase.com/pricing.html not working
// https://www.apple.com not working
// https://slack.com/intl/en-au/
// https://momentjs.com/',

webIconScraper({
  url: 'https://www.ibm.com/au-en',
  sort: 'des'
}).then(result => {
  console.log(result);
}, err => {
  console.log(err);
});