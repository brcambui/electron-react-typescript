import { execSync } from "child_process"
import fs from "fs"

import paths from "../helpers/paths"

function run() {
  buildRenderer()
  buildMain()
  clearDistFolder()
  buildElectron()
}

function buildRenderer() {
  execSync("npm run build:renderer", {
    stdio: "inherit"
  })
}

function buildMain() {
  execSync("npm run build:main", {
    stdio: "inherit"
  })
}

function clearDistFolder() {
  const distExists = fs.existsSync(paths.dist)
  if (!distExists) return
  fs.rmSync(paths.dist, {
    force: true,
    recursive: true
  })
}

function buildElectron() {
  execSync("npm run build:electron", {
    stdio: "inherit"
  })
}

run()