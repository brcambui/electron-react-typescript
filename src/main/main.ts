import { app, BrowserWindow } from "electron"
import isDev from "electron-is-dev"
import path from "path"
import url from "url"

const productionUrl = path.resolve(__dirname, "../renderer/index.html")

const appUrl = isDev
  ? "http://localhost:3000"
  : url.format({
    pathname: productionUrl,
    protocol: "file:",
    slashes: true
  })

async function run() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  })
  await mainWindow.loadURL(appUrl)
  mainWindow.show()
}

app.whenReady().then(run)