/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['antd', 'rc-util', '@ant-design', 'rc-pagination', 'rc-picker', 'react-hotjar']
  // experimental: { esmExternals: true },
};
// const withTM = require("next-transpile-modules")(["antd"]);

module.exports = nextConfig;
