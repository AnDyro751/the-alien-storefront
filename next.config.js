const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const { i18n } = require("./next-i18next.config");
const nextConfig = {
  i18n,
  images: {
    path: "https://res-1.cloudinary.com/healthbox/image/upload",
    // domains: ["localhost", "localhost:3001"],
    loader: "cloudinary"
  },
};
module.exports = nextConfig
// module.exports = withBundleAnalyzer(nextConfig);
