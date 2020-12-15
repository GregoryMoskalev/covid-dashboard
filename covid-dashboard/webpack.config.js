const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js'
  },
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    hot: true,
    port: 5500
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'COVID-19 Dashboard',
      template: path.resolve(__dirname, './src/template.html'),
      filename: 'index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ESLintPlugin(),
    new miniCss({
      filename: 'main.css'
    })
  ],
  resolve: {
    alias: {
        "./images/layers.png$": path.resolve(
            __dirname,
            "./node_modules/leaflet/dist/images/layers.png"
        ),
        "./images/layers-2x.png$": path.resolve(
            __dirname,
            "./node_modules/leaflet/dist/images/layers-2x.png"
        ),
        "./images/marker-icon.png$": path.resolve(
            __dirname,
            "./node_modules/leaflet/dist/images/marker-icon.png"
        ),
        "./images/marker-icon-2x.png$": path.resolve(
            __dirname,
            "./node_modules/leaflet/dist/images/marker-icon-2x.png"
        ),
        "./images/marker-shadow.png$": path.resolve(
            __dirname,
            "./node_modules/leaflet/dist/images/marker-shadow.png"
        )
    }
  },
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [ 'babel-loader' ]
      },
      {
        test: /\.(s*)css$/,
        use: [ miniCss.loader, 'css-loader', 'sass-loader' ]
      }
    ]
  }
};
