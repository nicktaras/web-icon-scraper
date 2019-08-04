const https = require('https');
const cheerio = require('cheerio');
const getIconData = ({ type = undefined, data }) => {
  const sizes = data.attr('sizes');
  const sIndex = sizes ? sizes.indexOf('x') : undefined;
  const size = sizes ? Number(sizes.substring(0, sIndex)) : undefined;
  const link = data.attr('href');
  return { type, size, link }
}
const asc = (a, b) => {
  if (a.size < b.size) { return -1; }
  if (a.size > b.size) { return 1; }
  return 0;
}
const des = (a, b) => {
  if (a.size > b.size) { return -1; }
  if (a.size < b.size) { return 1; }
  return 0;
}
const getIconDataOrdered = ({ sort = 'asc', icons }) => {
  if (sort === 'asc') { return icons.sort(asc); }
  return icons.sort(des);
}
module.exports = ({ url, sort = 'asc' }) => {
  return new Promise(function (resolve, reject) {
    let data;
    https.get(url, (res) => {
      res.on('data', (d) => {
        data += d.toString();
      });
      res.on('end', () => {
        const $ = cheerio.load(data);
        let icons = [];
        $('link[rel="icon"]').each(function () {
          icons.push(getIconData({ type: 'favicon', data: $(this) }));
        });
        $('link[rel="apple-touch-icon"]').each(function () {
          icons.push(getIconData({ type: 'apple-touch-icon', data: $(this) }));
        });
        if (sort === 'asc') { icons = getIconDataOrdered({ sort, icons }) }
        else { icons = getIconDataOrdered({ sort, icons }) }
        resolve(icons);
      });
    }).on('error', (e) => {
      reject('error', e);
    });
  });
};