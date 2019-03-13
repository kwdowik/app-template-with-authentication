const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const path = require("path");

const copyPlugin = new CopyPlugin([
  { from: __dirname + "/src/assets/images", to: "./" },
  { from: __dirname + "/public/manifest.json", to: "./" }
]);

const htmlPlugin = new HtmlWebPackPlugin({
  title: "Progressie Web Application",
  template: "./public/index.html",
  filename: "./index.html"
});

const scssPlugin = new MiniCssExtractPlugin({
  filename: "[name].css",
  chunkFilename: "[id].css"
});

const workBoxPlugin = new WorkboxPlugin.GenerateSW({
  clientsClaim: true,
  skipWaiting: true
});

module.exports = (env = {}, argv) => {
  const isDevBuild = argv.mode === "development";
  const apiHost = env.apiHost || "localhost";
  const apiPort = env.apiPort ? Number(env.apiPort) : 3000;
  const apiProtocol = env.apiProtocol || "http";

  const apiUrl = `${apiProtocol}://${apiHost}:${apiPort}/api`;

  console.info(`Using apiUrl: ${apiUrl}`);
  console.info(`isDevBuild: ${isDevBuild}`);

  return [
    {
      devServer: {
        historyApiFallback: true
      },
      entry: "./src/index.tsx",
      resolve: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
      module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            loader: "tslint-loader",
            enforce: "pre",
            options: { emitErrors: isDevBuild }
          },
          { test: /\.(ts|tsx)$/, use: "ts-loader?silent=true" },
          {
            test: /\.html$/,
            use: [{ loader: "html-loader", options: { minimize: !isDevBuild } }]
          },
          {
            test: /\.s?[ac]ss$/,
            use: [
              isDevBuild ? "style-loader" : MiniCssExtractPlugin.loader,
              "css-loader",
              "sass-loader"
            ]
          }
        ]
      },
      resolve: {
        extensions: [".tsx", ".ts", ".js"]
      },
      output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
      },
      plugins: [
        new webpack.DefinePlugin({
          API_URL: JSON.stringify(apiUrl)
        }),
        new CleanWebpackPlugin(),
        htmlPlugin,
        scssPlugin,
        workBoxPlugin,
        copyPlugin
      ]
    }
  ];
};
