const path = require('path');
var HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './public/js/chat.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/js')
  },
  module:{
    rules:[
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ]
  },
  // plugins: [
  //   new HtmlWebPackPlugin({
  //     template: "./public/chat.html",
  //     filename: "./chat.html"
  //   }),
  // ]
};