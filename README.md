# web-icon-scraper
A Node Package to retrieve an array of favicons and apple-touch-icon images sorting them into ascending or descending size order.

# Usage

This is not production ready at this time - Please use with caution.

Example Use:

````

  const webIconScraper = require('web-icon-scraper');

  webIconScraper({
    url: 'https://github.com',
    sort: 'des',
    limit: 1
  }).then(output => {
    console.log(output);
  });

  // example output:
  [
    {
      type: 'favicon',
      size: 20,
      link: 'https://github.githubassets.com/favicon.ico'
    }
  ]
````

# Options:

url: 'url' you wish to use as String (required)

sort: 'asc' or 'des' (descending or ascending in size)

limit: number to limit icons, defaults to 10.

# Test
from the /test directory run, yarn test
