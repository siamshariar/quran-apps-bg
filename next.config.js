const withPWA = require("next-pwa");
const slug = "1-al-fatihah";

module.exports = withPWA({
  future: { webpack5: true },
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === 'development',
    register: true,
    // skipWaiting: true,
  },
  async redirects() {
    return [
      {
        source: "/chapters",
        destination: `/chapters/${slug}`,
        permanent: true,
      },
    ];
  },
});
