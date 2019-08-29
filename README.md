# web-icon-scraper
A Node Package to retrieve an array of favicons and apple-touch-icon images sorting them into ascending or descending size order.

# Usage

Example Use:

````

  const webIconScraper = require('web-icon-scraper');

  webIconScraper({
    url: 'https://github.com',
    sort: 'des',
    limit: 1,
    checkStatus: false
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
url: 'url' as String (required)

sort: 'asc' or 'des' (descending or ascending in icon size)

limit: limit icons as Integer.

checkStatus: When true it checks the status code of each icon, returns all of status code 200. 

# Test
from the /test directory run, yarn test

# TODO's
- Refine the code to improve performance
- Add Typscript




