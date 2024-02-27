import { Configuration, DefinePlugin, EnvironmentPlugin } from "webpack"
import merge from "webpack-merge"
import path from "path"

import paths from "../helpers/paths"
import base from "./base"

const main = path.resolve(paths.srcMain, "main.ts")
const preload = path.resolve(paths.srcMain, "preload.ts")

const mainProd: Configuration = {
  devtool: "source-map",
  mode: "production",
  target: "electron-main",
  entry: {
    main,
    preload
  },
  output: {
    path: paths.buildMain,
    filename: "[name].js",
    clean: true,
    library: {
      type: "umd"
    }
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: "production"
    }),
    new DefinePlugin({
      "process.type": "'browser'",
    })
  ],
  // Using node.js __dirname and __filename
  node: {
    __dirname: false,
    __filename: false,
  }
}

export default merge(base, mainProd)