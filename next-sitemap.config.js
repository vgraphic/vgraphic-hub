/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://vgraphic.vercel.app',
  generateRobotsTxt: true, // (optional) generate robots.txt
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  // optional: exclude certain paths from sitemap
  exclude: ['/some-excluded-page'],

  // optional: additional paths if you want
  additionalPaths: async (config) => [
    await config.transform(config, '/custom-path'),
  ],
};
