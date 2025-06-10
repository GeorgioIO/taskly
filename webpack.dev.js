// webpack.dev.js
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  output: {
    publicPath: "/", // for local dev
  },
  devServer: {
    watchFiles: ["./src/template.html"],
    open: true,
    port: 8080,
  },
});
