import { app } from "electron"
import path from "path"

const devPath = path.resolve(__dirname, "../../resources")
const productionPath = process.resourcesPath
const resourcesPath = app.isPackaged
  ? productionPath
  : devPath

export default resourcesPath