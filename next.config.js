module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dash",
        permanent: false,
      },
      {
        source: "/dashboard",
        destination: "/dash",
        permanent: false,
      }
    ];
  },
};
