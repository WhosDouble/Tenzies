const path = require("path");

module.exports = {
  mode: "development", // or 'production'
  entry: "./index.js",
  output: {
    filename: "index.pack.js",
    path: path.resolve(__dirname, "dist"), // or your preferred output directory
  },
  resolve: {
    extensions: [".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
};
