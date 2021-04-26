const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const { i18n } = require("./next-i18next.config");
const nextConfig = {
  i18n,
};
module.exports = withBundleAnalyzer(nextConfig);
