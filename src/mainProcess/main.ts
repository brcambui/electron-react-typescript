import { app, BrowserWindow, BrowserWindowConstructorOptions, ipcMain } from 'electron'
import path from 'path'
import url from 'url'
import isDev from 'electron-is-dev'

import { checkForUpdates } from './appUpdate'

let mainWindow: BrowserWindow | null = null

let starting: boolean = true

const appURL: string = isDev
  ? `http://localhost:3000/`
  : url.format({
    pathname: path.join(__dirname, `../../index.html`),
    protocol: `file:`,
    slashes: true
  })

const windowPreferences: BrowserWindowConstructorOptions = {
  width: 960,
  height: 600,
  webPreferences: {
    contextIsolation: false,
    webSecurity: false,
    nodeIntegration: true
  }
}

function onWindowAllClosed() {
  mainWindow = null
  if (!starting) app.quit()
}

async function onReady() {
  await splashScreen()
  await createWindow()
}

async function splashScreen() {
  mainWindow = new BrowserWindow({
    ...windowPreferences,
    width: 480,
    height: 308,
    frame: false,
    closable: false,
    resizable: false
  })
  await mainWindow.loadURL(appURL + `?view=splash`)
  mainWindow.show()
  await checkForUpdates()
  mainWindow.destroy()
}

async function createWindow() {
  mainWindow = new BrowserWindow(windowPreferences)
  await mainWindow.loadURL(appURL)
  mainWindow.show()
  if (isDev) mainWindow.webContents.openDevTools()
  starting = false
}

app.on(`window-all-closed`, onWindowAllClosed)
app.on(`ready`, onReady)

ipcMain.on(`app-info`, (evt) => {
  evt.sender.send(`app-info`, new AppInfo(isDev, app.getVersion()))
})