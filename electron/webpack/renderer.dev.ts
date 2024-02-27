import "webpack-dev-server"
import { Configuration, EnvironmentPlugin, LoaderOptionsPlugin } from "webpack"
import merge from "webpack-merge"
import path from "path"
import HtmlWebpackPlugin from "html-webpack-plugin"

import base from "./base"
import paths from "../helpers/paths"
import port from "../helpers/port"

const url = `http://localhost:${port}`
const entry = path.resolve(paths.srcRenderer, "index.tsx")
const template = path.resolve(paths.srcRenderer, "index.html")

const rendererDev: Configuration = {
  devtool: "inline-source-map",
  mode: "development",
  devServer: {
    port
  },
  target: [
    "web",
    "electron-renderer"
  ],
  entry: [
    `webpack-dev-server/client?${url}`,
    "webpack/hot/only-dev-server",
    entry
  ],
  output: {
    path: paths.buildRenderer,
    filename: "index.js",
    clean: true,
    library: {
      type: "umd",
    }
  },
  module: {
    rules: [
      {
        test: /\.s?(c|a)ss$/,
        include: /\.module\.s?(c|a)ss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?(c|a)ss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ],
      },
      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      // Images
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      // SVG
      {
        test: /\.svg$/,
        type: "asset/inline"
      }
    ]
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: "development",
    }),
    new LoaderOptionsPlugin({
      debug: true,
    }),
    // new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template
    }),
  ]
}

export default merge(base, rendererDev)