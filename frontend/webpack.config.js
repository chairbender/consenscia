module.exports = {
  entry: "./src/js/App.jsx",
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
      { test: /\.json$/, loader: "json-loader"}
    ]
  },
  node: {
    dns: 'mock',
    net: 'mock'
  }
};