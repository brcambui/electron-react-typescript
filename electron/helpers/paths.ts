import path from "path"

const root = path.resolve(__dirname, "../..")
const build = path.resolve(root, "build")
const buildMain = path.resolve(build, "main")
const buildRenderer = path.resolve(build, "renderer")
const dist = path.resolve(root, "dist")
const src = path.resolve(root, "src")
const srcMain = path.resolve(src, "main")
const srcRenderer = path.resolve(src, "renderer")
const preload = path.resolve(__dirname, "preload.js")

const paths = {
  root,
  build,
  buildMain,
  buildRenderer,
  dist,
  src,
  srcMain,
  srcRenderer,
  preload
}

export default paths