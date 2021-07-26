import fs from 'fs'

export const fileExists = (pathToFile: string) => {
  try {
    let info = fs.lstatSync(pathToFile)
    return info.isFile()
  } catch (err) {
    return false
  }
}

export const mkdirp = (pathToDir: string) => {
  if (!fs.existsSync(pathToDir)) {
    fs.mkdirSync(pathToDir)
  }
}