'use strict';

const copyWebpackPlugin = require('copy-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

//This will copy all images and css to corresponding folders
const copyWebpackPluginConfig = new copyWebpackPlugin([
  {
    from: 'public/images',
    to: 'images'
  }
]);
const htmlWebpackPluginConfig = new htmlWebpackPlugin({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject: 'body' //put the script tag inside the body tag
});

module.exports = {
  entry: __dirname + '/src/entry.js',
  output: { 
    path: __dirname + '/build', 
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { 
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,        
        query: {
          presets: [ 'es2015', 'react' ]
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },
  plugins: [copyWebpackPluginConfig, htmlWebpackPluginConfig],
  devServer: {
    inline: true,
    port: 8080
  }
};