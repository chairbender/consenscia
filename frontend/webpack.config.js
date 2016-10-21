var webpack = require("webpack");
module.exports = {
  entry: ['./src/js/react/App.jsx'],
  devtool: 'source-map',
  output: {
    path: __dirname + "/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      { test: /\.json$/, loader: "json-loader"},
      { test: /\.(jpe?g|png|gif)$/i, loader: 'url?limit=10000!img?progressive=true' },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        loader: "file"
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  node: {
    dns: 'mock',
    net: 'mock'
  }
};
