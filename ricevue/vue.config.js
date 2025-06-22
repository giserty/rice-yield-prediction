// const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  //关闭eslint
  lintOnSave: false,
  
  chainWebpack: config => {
    config.module
        .rule('url-loader')
        .test(/\.(cur)(\?.*)?$/)
        .use('url-loader')
        .loader('url-loader')
        .end()
  },

  // earthSDK
  // configureWebpack: (config) => {
  //   const cwp = new CopyWebpackPlugin([
  //     {
  //       from: "./node_modules/earthsdk/dist/XbsjCesium",
  //       to: "js/earthsdk/XbsjCesium",
  //       toType: "dir",
  //     },
  //     {
  //       from: "./node_modules/earthsdk/dist/XbsjEarth",
  //       to: "js/earthsdk/XbsjEarth",
  //       toType: "dir",
  //     },
  //   ]);
  //   config.plugins.push(cwp);
  // },
};
// vue.config.js
