module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dash",
        permanent: true,
      },
    ];
  },
};
