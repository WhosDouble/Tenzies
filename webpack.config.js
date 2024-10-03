const path = require("path");

module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    filename: "index.pack.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // Clear the output directory before each build
  },
  resolve: {
    extensions: [".js", "jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Updated to include both .js and .jsx
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

  devServer: {
    static: {
      directory: path.join(__dirname, "."), // Serve files from the root
    },
    historyApiFallback: true, // Redirect 404s to index.html
    port: 8080,
    open: true, // Automatically open the browser after server starts
    headers: {
      "Content-Security-Policy":
        "script-src 'self' 'unsafe-inline' 'unsafe-eval';", // Allow inline scripts and eval
    },
    hot: true, // Enable hot module replacement
  },
};
