const path = require("path");

const entryPoints = [
  "index",
  "404",
  "page"
]

module.exports = {
  mode: "production",
  // One entrypoint per page with custom javascript.
  entry: entryPoints.reduce((all, e) => ({
    ...all,
    [e]: path.join(__dirname, "webpack", e),
  }), {}),
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
