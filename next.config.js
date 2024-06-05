// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     appDir: true,
//   },
// }

// module.exports = nextConfig

// module.exports = {
//   future: {
//     webpack5: true,
//   },
//   webpack: function (config, options) {
//     console.log(options.webpack.version); // Should be webpack v5 now
//     config.experiments = {};
//     return config;
//   },
// };

const path = require("path");

module.exports = {
  trailingSlash: true,
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  future: {
    webpack5: true,
  },
};

