const slug = "1-al-fatihah";

module.exports = {
  async redirects() {
    return [
      {
        source: "/chapters",
        destination: `/chapters/${slug}`,
        permanent: true,
      },
    ];
  },
};
