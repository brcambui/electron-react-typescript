import path from 'path'
import { configure, getLogger, shutdown } from 'log4js'

import { mkdirp } from './file'
import { logPath } from './paths'

try {
  mkdirp(logPath)
  configure({
    appenders: {
      file: {
        type: `dateFile`,
        filename: path.join(logPath, `electron-react-typescript.log`),
        keepFileExt: true
      },
      stdout: {
        type: `stdout`
      }
    },
    categories: {
      default: { appenders: [`file`, `stdout`], level: `all` }
    }
  })
} catch (e) { }

export const logger = getLogger()
export const createLogger = getLogger
export const stopLogger = shutdown