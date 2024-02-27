import { app } from "electron"
import path from "path"
import url from "url"
import port from "./port"

const productionPath = path.resolve(__dirname, "../renderer/index.html")
const productionUrl = url.format({
  pathname: productionPath,
  protocol: "file:",
  slashes: true
})
const devUrl = `http://localhost:${port}`
const appUrl = app.isPackaged
  ? productionUrl
  : devUrl

export default appUrl