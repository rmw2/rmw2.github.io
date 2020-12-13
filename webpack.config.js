const path = require("path");

module.exports = {
  mode: "production",
  watch: true,
  entry: {
    index: path.join(__dirname, "webpack", "index"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "assets/js"),
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ],
      },
    ],
  },
  resolve: {
    extensions: [".json", ".js", ".jsx"],
  },
};
