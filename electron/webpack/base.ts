import { Configuration, EnvironmentPlugin } from "webpack"
import TSConfigPathsPlugin from "tsconfig-paths-webpack-plugin"

import paths from "../helpers/paths"

const base: Configuration = {
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            // Remove this line to enable type checking in webpack builds
            transpileOnly: true,
            compilerOptions: {
              module: "esnext",
            }
          }
        }
      }
    ]
  },
  output: {
    path: paths.src,
    // https://github.com/webpack/webpack/issues/1114
    library: {
      type: "commonjs2"
    }
  },
  resolve: {
    // Determine the array of extensions that should be used to resolve modules.
    extensions: [
      ".js",
      ".jsx",
      ".json",
      ".ts",
      ".tsx"
    ],
    modules: [
      paths.src,
      "node_modules"
    ],
    plugins: [
      new TSConfigPathsPlugin()
    ],
  },
  plugins: [
    new EnvironmentPlugin({
      // This will be overrided by other configs.
      NODE_ENV: "production",
    })
  ]
}

export default base