import { app } from "electron";
import path from "path";
import url from "url";

const port = process.env.PORT || 1212;
const productionPath = path.resolve(__dirname, "../renderer/index.html");
const productionUrl = url.format({
  pathname: productionPath,
  protocol: "file:",
  slashes: true
});
const devUrl = `http://localhost:${port}`;
const appUrl = app.isPackaged
  ? productionUrl
  : devUrl;

export default appUrl;