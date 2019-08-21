const tap = require('tap');
const webIconScraper = require('./../index');

const linkTestData = [
  { url: "https://reactjs.org/", expected: "https://reactjs.org/favicon.ico" },
  { url: "https://www.sony.com.au/", expected: "https://www.sony.com.au/assets/images/apple-touch-icon-72x72.png" },
  { url: "https://www.bbc.co.uk/", expected: "https://www.bbc.co.uk/favicon.ico" },
  { url: "https://www.apple.com.au/", expected: "https://www.apple.com.au/favicon.ico" },
  { url: "https://github.com", expected: "https://github.githubassets.com/favicon.ico" },
  { url: "https://auspost.com.au/", expected: "https://auspost.com.au/content/dam/global/favicons/apple-touch-icon-72x72.png" },
  { url: "https://www.ibm.com/au-en", expected: "https://www.ibm.com/favicon.ico" },
  { url: "https://www.bose.com.au/en_au/index.html", expected: "https://static.bose.com/etc/designs/bose/consumer-products-2016/favicon.ico" },
  { url: "https://momentjs.com", expected: "https://momentjs.com/static/img/moment-favicon.png" },
  { url: "https://slack.com/intl/en-au/", expected: "https://a.slack-edge.com/4a5c4/marketing/img/meta/favicon-32.png" },
  { url: "https://www.ministryofsound.com/", expected: "https://www.ministryofsound.com/media/3982/mos-favicon.png?width=57&height=57" },
  { url: "https://brave.com/", expected: "https://brave.com/wp-content/uploads/2018/02/cropped-brave_appicon_release-32x32.png" }
];

tap.test('Ensure links are correct', async tap => {
  for (var i = 0; i < linkTestData.length; i++) {
    const result = await webIconScraper({ url: linkTestData[i].url, sort: 'asc' });
    await tap.test('check result', async tap => {
      tap.equal(result.icons[0].link, linkTestData[i].expected);
    })
  }
});

