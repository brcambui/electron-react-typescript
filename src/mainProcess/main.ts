import { app, BrowserWindow, ipcMain as ipc } from 'electron'

import { checkForUpdates } from './checkForUpdates'
import { createLogger, stopLogger } from '../lib/logger'
import { appUrl } from '../lib/paths'

const logger = createLogger(`main`)

process.on(`uncaughtException`, error => {
  logger.fatal(error)
})

process.on(`unhandledRejection`, error => {
  logger.error(error)
})

process.on(`exit`, () => {
  stopLogger()
})

app.disableHardwareAcceleration()

const handlers = {
  'appVersion': app.getVersion
}

for (const [key, handler] of Object.entries(handlers)) {
  ipc.handle(key, handler)
}

const run = async () => {
  logger.info(`Waiting for ready state...`)
  await app.whenReady()

  await checkForUpdates()

  const _window = new BrowserWindow({
    width: 960,
    minWidth: 960,
    height: 600,
    minHeight: 600,
    frame: false,
    webPreferences: {
      contextIsolation: false,
      enableRemoteModule: true,
      nodeIntegration: true,
      webSecurity: false
    }
  })

  await _window.loadURL(appUrl)
  await _window.show()

  logger.info(`App is ready.`)
}

run()