const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: {
      name: "react-indexdb",
      type: "umd"
    },
    globalObject: "typeof self !== 'undefined' ? self : this",
    clean: true // Clean dist folder before build
  },
  externals: [
    nodeExternals(),
    { react: "react", "react-dom": "react-dom" }
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
};
