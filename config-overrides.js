const webpack = require("webpack");
module.exports = function override(config, env) {
  //do stuff with the webpack config...

  config.resolve.fallback = {
    url: false,
    buffer: false,
    fs: false,
    vm: false,
    crypto: false,
    stream: false,
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
  };

  return config;
};
