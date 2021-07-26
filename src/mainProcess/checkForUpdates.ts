import { app, BrowserWindow } from 'electron'
import { autoUpdater, UpdateInfo } from 'electron-updater'
import isDev from 'electron-is-dev'
import filesize from 'filesize'

import { appUrl } from '../lib/paths'
import { sleep } from '../lib/utils/sleep'
import { createLogger } from '../lib/logger'
import { sendIpcMessage } from '../lib/ipc'

const logger = createLogger(`checkForUpdates`)
autoUpdater.logger = logger
autoUpdater.autoDownload = false

interface ProgressEvent {
  total: number
  delta: number
  transferred: number
  percent: number
  bytesPerSecond: number
}

/** When true, block other update calls. */
let updating = false

const downloadUpdates = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {

      autoUpdater.on(`error`, async (error: Error) => {
        reject(error)
      })

      autoUpdater.on(`update-not-available`, async () => {
        resolve()
      })

      autoUpdater.on(`update-available`, async (info: UpdateInfo) => {
        // Blocking possible multiple update calls
        if (!updating) {
          updating = true
          await autoUpdater.downloadUpdate()
        } else {
          logger.warn(new Error(`Second update call detected.`), info)
        }
      })

      autoUpdater.on(`download-progress`, async (progress: ProgressEvent) => {
        const percent = progress.percent.toFixed(0)
        const speed = filesize(progress.bytesPerSecond)
        sendIpcMessage(`updateMessage`, `Downloading update (${percent}% @ ${speed}/s)...`)
      })

      autoUpdater.on(`update-downloaded`, async () => {
        sendIpcMessage(`updateMessage`, `Update downloaded.`)
        await sleep(1000)
        autoUpdater.quitAndInstall()
      })

      sendIpcMessage(`updateMessage`, `Checking for updates...`)

      if (isDev) {
        await sleep(1000)
        resolve()
      } else {
        autoUpdater.checkForUpdates()
      }

    } catch (error) {
      reject(error)
    }
  })
}

export const checkForUpdates = async () => {

  const _window = new BrowserWindow({
    width: 480,
    height: 308,
    frame: false,
    resizable: false,
    webPreferences: {
      contextIsolation: false,
      enableRemoteModule: true,
      nodeIntegration: true,
      webSecurity: false
    }
  })

  await _window.loadURL(appUrl + `?view=splash`)
  await _window.show()

  // Closing window only after the main window has loaded.
  app.on(`browser-window-created`, (event, mainWindow) => {
    mainWindow.on(`ready-to-show`, async () => {
      await sleep(1000)
      _window.destroy()
    })
  })

  try {
    await downloadUpdates()
  } catch (error) {
    logger.error(error)
    await _window.close()
  }
}