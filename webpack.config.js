var path = require('path');

module.exports = {
  devtool: 'eval',
  entry: {
    client: './app/app.js'
  },
  output: {
    path: path.join(__dirname, 'client/js'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, './app')
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      }
    ]
  }
};
