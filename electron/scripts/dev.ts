import { spawn } from "child_process"
import util from "util"
import waitOn from "wait-on"

import port from "../helpers/port"

const wait = util.promisify(waitOn)

async function run() {
  startRenderer()
  await waitRenderer()
  startMain()
}

function startRenderer() {
  spawn("npm", ["run", "dev:renderer"], {
    shell: true,
    stdio: "inherit",
  })
}

async function waitRenderer() {
  await wait({
    timeout: 60000,
    resources: [
      `http://localhost:${port}`
    ]
  })
}

function startMain() {
  spawn("npm", ["run", "dev:main"], {
    shell: true,
    stdio: "inherit",
  })
}

run()