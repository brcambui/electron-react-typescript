const path = require("path")

const outputPath = path.resolve(__dirname, "../..", "build", "main")
const srcPath = path.resolve(__dirname, "../..", "src")
const mainPath = path.join(srcPath, "main")
const tsConfigPath = path.join(mainPath, "tsconfig.json")
const electronEntryPath = path.join(mainPath, "main.ts")

module.exports = [
  {
    mode: "production",
    entry: electronEntryPath,
    target: "electron-main",
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
    }
  }
]