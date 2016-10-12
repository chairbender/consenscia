module.exports = {
    entry: "./src/js/App.jsx",
    output: {
        path: __dirname + "/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader"
            }
        ]
    }
};