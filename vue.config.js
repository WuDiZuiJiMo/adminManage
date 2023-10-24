const { defineConfig } = require("@vue/cli-service");
const path = require("path");
function resolve(dir) {
  return path.resolve(__dirname, dir);
}

module.exports = defineConfig({
  lintOnSave: false, // 关闭eslint校验
  transpileDependencies: true,
  // 部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
  publicPath: process.env.NODE_ENV === "development" ? "./" : "/",
  outputDir: "docSystem",

  configureWebpack: {
    module: {
      rules: [
        // 配置读取 *.md 文件的规则
        {
          test: /\.md$/,
          use: ["text-loader"],
        },
      ],
    },
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("docs", resolve("./docs"))
  },
});
