const http = require('http');
const https = require('https');
const cheerio = require('cheerio');
const sortBySize = require('./sortBySize');
const urlMod = require('url');
const domainExtList = require('./domainExtList');

// Get the max icon size data from meta
const getIconMaxSize = (sizes) => {
  if (!sizes) console.warn('getIconMaxSize: sizes were missing');
  const sIndex = sizes ? sizes.lastIndexOf('x') + 1 : undefined;
  return (sizes && sIndex) ? Number(sizes.substring(sIndex, sizes.length)) : undefined;
}

// Clean up the link
const getCleanLink = ({ link, host, reqProtocol }) => {
  if (!link) console.warn('getCleanLink: link was missing');
  const indexOfHttp = link.indexOf('http');
  const indexOfWww = link.indexOf('www');
  // e.g. htts://www.a.com/favicon.ico
  if (indexOfHttp === 0 || indexOfWww === 0) return link;
  // e.g. example.www.a.com/favicon.ico
  if (indexOfWww > 0 && indexOfHttp === -1) {
    const removeChars = link.substring(0, indexOfWww);
    return link.replace(removeChars, '');
  }
  // e.g. example.https://a.com/favicon.ico
  if (indexOfHttp > 0) {
    const removeChars = link.substring(0, indexOfHttp);
    return link.replace(removeChars, '');
  }
  // e.g. static.com/favicon.ico
  const linkToArray = link.replace(/([/.])/g, ',').toUpperCase().split(',');
  const matchFound = linkToArray.some(r => domainExtList.indexOf(r) >= 0);
  if (matchFound) {
    return `${reqProtocol}:${link}`;
  }
  if (host) {
    return `${host}${link}`;
  }
  return undefined;
}

// Returns object { type: String size: String link: String }
const getIconData = ({ type = undefined, data, host, reqProtocol }) => {
  if (!data) console.warn('getIconData: data was missing');
  const size = getIconMaxSize(data.attr('sizes'));
  const link = getCleanLink({ link: data.attr('href'), host, reqProtocol });
  return { type, size, link };
};

// Returns object array [{ type: String size: String link: String }]
const getIconDataOrdered = ({ sort = 'asc', icons }) => {
  if (!icons) console.warn('getIconDataOrdered: icons were missing');
  if (sort === 'asc') { return icons.sort(sortBySize.ascending); }
  return icons.sort(sortBySize.descending);
};

module.exports = {
  // Returns object array [{ type: String size: String link: String }]
  getIconRequest: ({ url, sort = 'asc' }) => {
    return new Promise(function (resolve, reject) {
      const _url = urlMod.parse(url, true);
      const host = _url.host;
      const protocol = _url.protocol;
      const reqTypes = [http, https];
      const reqTypeIndex = (protocol.indexOf('https') <= -1) ? 0 : 1;
      const reqProtocol = (protocol.indexOf('https') <= -1) ? 'http' : 'https';
      reqTypes[reqTypeIndex].get(url, (res) => {
        let data;
        res.on('data', (d) => {
          data += d;
        });
        res.on('end', () => {
          let icons = [];
          if (data) {
            data = data.toString();
            // TODO - handle strategy for: undefinedRedirecting to https://...
            if (data) {
              const $ = cheerio.load(data);
              $('link[rel="icon"]').each(function () {
                icons.push(getIconData({ type: 'favicon', data: $(this), host, reqProtocol }));
              });
              $('link[rel="icon"]').each(function () {
                icons.push(getIconData({ type: 'favicon', data: $(this), host, reqProtocol }));
              });
              $('link[type="msapplication - TileImage"]').each(function () {
                icons.push(getIconData({ type: 'favicon', data: $(this), host, reqProtocol }));
              });
              $('link[type="image / vnd.microsoft.icon"]').each(function () {
                icons.push(getIconData({ type: 'favicon', data: $(this), host, reqProtocol }));
              });
              $('link[type="image / x - icon"]').each(function () {
                icons.push(getIconData({ type: 'favicon', data: $(this), host, reqProtocol }));
              });
              $('link[rel="shortcut icon"]').each(function () {
                icons.push(getIconData({ type: 'favicon', data: $(this), host, reqProtocol }));
              });
              $('link[rel="apple-touch-icon"]').each(function () {
                icons.push(getIconData({ type: 'apple-touch-icon', data: $(this), host, reqProtocol }));
              });
              if (sort === 'asc') { icons = getIconDataOrdered({ sort, icons }) }
              else { icons = getIconDataOrdered({ sort, icons }) }
            }
          }
          const uniqueIcons = new Set(icons);
          icons = [...uniqueIcons];
          resolve({ icons });
        });
      }).on('error', (e) => {
        reject({
          err: 'web-icon-scraper: could not resolve data from url ',
          info: e,
          icons: []
        });
      });
    });
  }
};


// if ($(link[rel = "icon"])) {
//   console.log('icon');
//   icons.push(getIconData({ type: 'favicon', data: $(link), host }));
// }
// if (link.toString().indexOf('favicon') > -1) {
//   console.log('text of fav');
//   icons.push(getIconData({ type: 'favicon', data: $(link), host }));
// }
// if ($(link[rel = "shortcut icon"])) {
//   console.log('short');
//   icons.push(getIconData({ type: 'favicon', data: $(link), host }));
// }
// if ($(link[type = "image/vnd.microsoft.icon"])) {
//   console.log('micro');
//   icons.push(getIconData({ type: 'favicon', data: $(link), host }));
// }
// if ($(link[type = "msapplication - TileImage"])) {
//   console.log('tile');
//   icons.push(getIconData({ type: 'favicon', data: $(link), host }));
// }
// if ($(link[rel = "apple-touch-icon"])) {
//   console.log('apple-touch-icon');
//   icons.push(getIconData({ type: 'apple-touch-icon', data: $(link), host }));
// }