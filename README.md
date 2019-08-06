# web-icon-scraper
A Node Package to retrieve an array of favicons and apple-touch-icon images sorting them into ascending or descending size order.

# Usage

This is not production ready at this time - Please use with caution.

Example Use:

````

  const webIconScraper = require('./index');

  webIconScraper({
    url: 'https://github.com',
    sort: 'des'
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

Options:

url: 'url' you wish to use as String (Required)
sort: 'asc' or 'des' as String (descending or ascending sort order)

# Test
from the /test directory run, yarn test
