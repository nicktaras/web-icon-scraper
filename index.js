const webIconScraper = require('./src/webIconScraper');
module.exports = async ({ url, sort = 'asc' }) => {
  return await webIconScraper.getIconRequest({ url, sort });
};