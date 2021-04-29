const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const { i18n } = require("./next-i18next.config");
const nextConfig = {
  i18n,
  images: {
    path: "https://res-1.cloudinary.com/healthbox/image/upload",
    // domains: ["localhost", "localhost:3001"],
    loader: "cloudinary",
    deviceSizes: [82, 110, 140, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
};
module.exports = nextConfig
// module.exports = withBundleAnalyzer(nextConfig);
