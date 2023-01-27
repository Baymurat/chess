/* eslint-disable */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: {
    main: "./src/index.tsx"
  },

  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]-[hash].js",
    publicPath: '/',
  },
  devtool: "source-map",
  devServer: {
    port: "3000",
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "public")
    },
    hot: true,
    liveReload: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, 
        exclude: /node_modules/, 
        use: "babel-loader", 
      },
      {
        test: /\.(ts|tsx)$/, 
        exclude: /node_modules/, 
        use: "ts-loader", 
      },
      {
        test: /\.(s[ac]ss)$/, 
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html")
    }),
    new Dotenv()
  ]
};