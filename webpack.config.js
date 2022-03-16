const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: './src/js/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'public_html'),
    publicPath: '/',
    filename: '[name].js',
    assetModuleFilename: 'resources/[name][ext][query]'
  },
  target:['web', 'es5'],
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new HtmlWebpackPlugin({
      template: "./src/html/index.html",
      filename: "./index.html",
      excludeChunks: [ 'server' ]
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [[
              '@babel/preset-env', 
              {
                "targets": {
                  "edge": "17",
                  "firefox": "60",
                  "chrome": "58",
                  "safari": "11.1",
                  "ie": "11"
                }
              }
            ]]
          }
        }
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins 
        test: /\.html$/,
        use: [{
          loader: "html-loader",
          options: { minimize: true }
        }]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif|pdf|woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?)$/,
        type: 'asset/resource'
      }
    ]
  },
}