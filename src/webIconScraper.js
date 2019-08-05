const http = require('http');
const https = require('https');
const cheerio = require('cheerio');
const sortBySize = require('./sortBySize');
const urlMod = require('url');

// Get the max icon size data from meta
const getIconMaxSize = (sizes) => {
  if (!sizes) console.warn('getIconMaxSize: sizes were missing');
  const sIndex = sizes ? sizes.lastIndexOf('x') + 1 : undefined;
  return (sizes && sIndex) ? Number(sizes.substring(sIndex, sizes.length)) : undefined;
}

// Clean up the link
const getCleanLink = ({ link, host }) => {
  if (!link) console.warn('getCleanLink: link was missing');
  const indexOfHttp = link.indexOf('http');
  const indexOfWww = link.indexOf('www');
  if (indexOfHttp === 0 || indexOfWww === 0) return link;
  if (indexOfWww > 0 && indexOfHttp === -1) {
    const removeChars = link.substring(0, indexOfWww);
    return link.replace(removeChars, '');
  }
  if (indexOfHttp > 0) {
    const removeChars = link.substring(0, indexOfHttp);
    return link.replace(removeChars, '');
  }
  if (host) {
    return host + link;
  }
  return undefined;
}

// Returns object { type: String size: String link: String }
const getIconData = ({ type = undefined, data, host }) => {
  if (!data) console.warn('getIconData: data was missing');
  const size = getIconMaxSize(data.attr('sizes'));
  const link = getCleanLink({ link: data.attr('href'), host });
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
      const ref = [http, https];
      const reqType = (protocol.indexOf('https') <= -1) ? 0 : 1;
      ref[reqType].get(url, (res) => {
        let data;
        res.on('data', (d) => {
          data += d;
        });
        res.on('end', () => {
          data = data.toString();
          let icons = [];
          if (data) {
            const $ = cheerio.load(data);
            $('link[rel="icon"]').each(function () {
              icons.push(getIconData({ type: 'favicon', data: $(this), host }));
            });
            $('link[rel="shortcut icon"]').each(function () {
              icons.push(getIconData({ type: 'favicon', data: $(this), host }));
            });
            $('link[rel="apple-touch-icon"]').each(function () {
              icons.push(getIconData({ type: 'apple-touch-icon', data: $(this), host }));
            });
            if (sort === 'asc') { icons = getIconDataOrdered({ sort, icons }) }
            else { icons = getIconDataOrdered({ sort, icons }) }
          }
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