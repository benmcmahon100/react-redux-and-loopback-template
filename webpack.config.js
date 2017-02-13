const path = require('path');
const webpack = require('webpack');


module.exports = {
  devtool: 'eval',
  devServer: {
  	hot: true
  },
  entry: [
    'webpack-hot-middleware/client',
    './app/app.js'
  ],
  output: {
    path: path.join(__dirname, 'client/js'),
    filename: 'bundle.js',
    publicPath: '/js'
  },
  plugins: [
  	new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel-loader'],
	exclude: '/node_modules',
        include: path.join(__dirname, './app')
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      }
    ]
  }
};
