import chokidar from "chokidar";
import cp from "child_process";
import fs from "fs";
import path from "path";

import esbuild from "../esbuild";
import rsbuild from "../rsbuild";

const buildMain = async () => {
  await esbuild({
    entryPoints: ["src/main/main.ts"],
    outdir: "build/main",
    envFilePath: ".env.development"
  });
};

const buildPreload = async () => {
  await esbuild({
    entryPoints: { preload: "src/main/preload.ts" },
    outdir: "build/main",
    envFilePath: ".env.development"
  });
};

const watch = (callback: (path: string) => void) => {
  const pathsToWatch = [
    "src/main",
    "src/common"
  ];
  const watcher = chokidar.watch(pathsToWatch, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
  });
  watcher.on("change", (path) => callback(path));
};

let electronProcess: cp.ChildProcess | null = null;
const electronExecPath = path.join(
  "node_modules",
  ".bin",
  process.platform === "win32" ? "electron.cmd" : "electron"
);
const startElectron = () => new Promise<void>((resolve, reject) => {
  if (electronProcess && !electronProcess.killed) {
    electronProcess.kill();
    electronProcess = null;
  }
  electronProcess = cp.spawn(electronExecPath, ["."], {
    stdio: "inherit",
    shell: true
  });
  electronProcess.on("spawn", () => resolve());
  electronProcess.on("error", (error) => reject(error));
});

const startRenderer = async () => {
  await rsbuild({ startDevServer: true });
};

const run = async () => {
  fs.rmSync("build", { recursive: true, force: true });
  await startRenderer();
  await buildMain();
  await buildPreload();
  await startElectron();
  let building = false;
  watch(async () => {
    try {
      if (building) return;
      building = true;
      console.clear();
      fs.rmSync("build", { recursive: true, force: true });
      await buildMain();
      await buildPreload();
      await startElectron();
    } catch (error) {
      console.error("Error during build:", error);
    } finally {
      building = false;
    }
  });
};

run();