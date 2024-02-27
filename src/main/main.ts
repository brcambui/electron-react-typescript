import { app, BrowserWindow } from "electron"

import appUrl from "../../electron/helpers/appUrl"
import paths from "@/electron/paths"

async function run() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: paths.preload
    }
  })
  await mainWindow.loadURL(appUrl)
  mainWindow.show()
}

app.whenReady().then(run)