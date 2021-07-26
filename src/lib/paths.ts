import path from 'path'
import isDev from 'electron-is-dev'
import { app } from 'electron'
import { fileURLToPath } from 'url'

export const appUrl: string = isDev
  ? `http://localhost:4000/`
  : fileURLToPath(`file:///` + path.resolve(__dirname, `../../index.html`))

export const logPath = path.join(app.getPath(`userData`), `Logs`)