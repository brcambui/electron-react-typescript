import fs from "fs";
import { build as electronBuild, Platform } from "electron-builder";

import esbuild from "../esbuild";
import rsbuild from "../rsbuild";

const buildMain = async () => {
  await esbuild({
    entryPoints: ["src/main/main.ts"],
    outdir: "build/main",
    envFilePath: ".env.production"
  });
};

const buildPreload = async () => {
  await esbuild({
    entryPoints: { preload: "src/main/preload.ts" },
    outdir: "build/main",
    envFilePath: ".env.production"
  });
};

const buildRenderer = async () => {
  await rsbuild({
    output: {
      target: "web",
      assetPrefix: "auto",
      distPath: {
        root: "./build/renderer",
      }
    }
  });
};

const pack = async () => {
  const config = JSON.parse(fs.readFileSync("electron/build.json", "utf-8"));
  const getCurrentPlatform = () => {
    switch (process.platform) {
      case "win32": return Platform.WINDOWS;
      case "darwin": return Platform.MAC;
      case "linux": return Platform.LINUX;
      default: throw new Error("Unsupported platform: " + process.platform);
    }
  };
  const currentPlatform = getCurrentPlatform();
  console.log(`Building for platform: ${currentPlatform.name}`);
  await electronBuild({
    config,
    targets: currentPlatform.createTarget(),
  });
};

const run = async () => {
  fs.rmSync("build", { recursive: true, force: true });
  await buildMain();
  await buildPreload();
  await buildRenderer();
  await pack();
};

run();