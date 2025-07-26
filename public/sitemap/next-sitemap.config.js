/**
 * @type {import('next-sitemap').IConfig}
 */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://quran.vn',
  generateRobotsTxt: true,
  // Optionally, add more config for dynamic routes, exclude, etc.
  // For dynamic chapters:
  additionalPaths: async (config) => {
    // Fetch all chapter slugs from your data source
    const chapters = require('./data/chapters.js');
    // Generate /multi-translation/chapters/{slug}, /vietnamese_rwwad/chapters/{slug}, and /chapters/{slug}
    return chapters.flatMap((chapter) => [
      {
        loc: `/multi-translation/chapters/${chapter.slug}`,
        changefreq: 'weekly',
        priority: 0.7,
      },
      {
        loc: `/vietnamese_rwwad/chapters/${chapter.slug}`,
        changefreq: 'weekly',
        priority: 0.7,
      },
      {
        loc: `/chapters/${chapter.slug}`,
        changefreq: 'weekly',
        priority: 0.7,
      },
    ]);
  },
  robotsTxtOptions: {
    additionalSitemaps: [
      // Add more sitemaps here if needed
    ],
  },
};
