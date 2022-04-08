const path = require("path")
const NodemonPlugin = require("nodemon-webpack-plugin")

const outputPath = path.resolve(__dirname, "../..", "build", "main")
const srcPath = path.resolve(__dirname, "../..", "src")
const mainPath = path.join(srcPath, "main")
const tsConfigPath = path.join(mainPath, "tsconfig.json")
const electronEntryPath = path.join(mainPath, "main.ts")
const electronCompiledEntryPath = path.join(outputPath, "main.js")

module.exports = [
  {
    watch: true,
    mode: "development",
    entry: electronEntryPath,
    target: "electron-main",
    devtool: "source-map",
    resolve: {
      extensions: [".ts", ".js"],
    },
    module: {
      rules: [{
        test: /\.ts$/,
        include: /src/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: tsConfigPath
          }
        }
      }]
    },
    output: {
      path: outputPath,
      filename: "main.js",
      clean: true
    },
    plugins: [
      new NodemonPlugin({
        watch: outputPath,
        exec: `electron "${electronCompiledEntryPath}" --inspect=5858`,
        delay: "1000",
        verbose: true
      })
    ]
  }
]