require('dotenv').config();
const path = require('path');
const webpack = require('webpack');

// noinspection Annotator
module.exports = {
  devtool: 'eval',
  devServer: {
    env: process.env.NODE_ENV,
    hot: true,
    quiet: true
  },
  entry: {
    client: [
      'webpack-hot-middleware/client',
      './app/main.styl',
      './app/app.js'
    ],
    /*admin: [
      'webpack-hot-middleware/client',
      './adminApp/main.styl',
      './adminApp/app.js'
    ]*/
  },
  output: {
    path: path.join(__dirname, 'client'),
    filename: '[name].bundle.js',
    publicPath: '/js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      env: process.env.NODE_ENV
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot-loader', 'babel-loader'],
        exclude: '/node_modules',
        include: path.join(__dirname, './app')
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader',
        include: path.join(__dirname, './app')
      },
      {
        test: /\.js$/,
        loaders: ['react-hot-loader', 'babel-loader'],
        exclude: '/node_modules',
        include: path.join(__dirname, './adminApp')
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader',
        include: path.join(__dirname, './adminApp')
      }
    ]
  }
};
