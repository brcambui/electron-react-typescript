const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

const configPath = path.resolve(__dirname, "../..", "config", "renderer")
const outputPath = path.resolve(__dirname, "../..", "build", "renderer")
const srcPath = path.resolve(__dirname, "../..", "src")
const babelConfigPath = path.join(configPath, "babel.config.json")
const rendererPath = path.join(srcPath, "renderer")
const publicPath = path.join(rendererPath, "public")
const tsConfigPath = path.join(rendererPath, "tsconfig.json")
const reactEntryPath = path.join(rendererPath, "index.tsx")
const htmlEntryPath = path.join(publicPath, "index.html")

module.exports = {
  mode: "production",
  entry: reactEntryPath,
  target: "electron-renderer",
  output: {
    path: outputPath,
    filename: "index.bundle.js",
    clean: true
  },
  mode: process.env.NODE_ENV || "development",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: [srcPath, "node_modules"]
  },
  devServer: {
    compress: true,
    static: { directory: publicPath },
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { configPath: babelConfigPath }
        }
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: { configFile: tsConfigPath }
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          "sass-loader"
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: htmlEntryPath }),
  ],
}