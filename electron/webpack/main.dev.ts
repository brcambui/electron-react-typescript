import { Configuration, DefinePlugin, EnvironmentPlugin } from "webpack"
import merge from "webpack-merge"
import NodemonWebpackPlugin from "nodemon-webpack-plugin"
import path from "path"

import paths from "../helpers/paths"
import base from "./base"

const main = path.resolve(paths.srcMain, "main.ts")
const preload = path.resolve(paths.srcMain, "preload.ts")
const nodemonEntrypoint = path.resolve(paths.buildMain, "main.js")

const mainProd: Configuration = {
  watch: true,
  devtool: "source-map",
  mode: "development",
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
      NODE_ENV: "development"
    }),
    new DefinePlugin({
      "process.type": "'browser'",
    }),
    new NodemonWebpackPlugin({
      watch: [paths.buildMain],
      exec: `electron "${nodemonEntrypoint}" --inspect=5858`
    })
  ],
  // Using node.js __dirname and __filename
  node: {
    __dirname: false,
    __filename: false,
  }
}

export default merge(base, mainProd)