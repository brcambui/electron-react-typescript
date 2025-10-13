import fs from "fs";
import { createRsbuild, RsbuildConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSass } from "@rsbuild/plugin-sass";

const config = JSON.parse(fs.readFileSync("electron/build.json", "utf-8"));
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 1212;

const defaultOptions: RsbuildConfig = {
  source: {
    entry: { index: "./src/renderer/index.tsx" },
    tsconfigPath: "tsconfig.json"
  },
  html: {
    title: config.productName,
    favicon: "resources/icon.png",
  },
  server: {
    port: port,
  },
  plugins: [
    pluginReact(),
    pluginSass()
  ]
};

const build = async ({ startDevServer, ...options }: Options = {}) => {
  const rsbuild = await createRsbuild({
    rsbuildConfig: {
      ...defaultOptions,
      ...options
    }
  });
  if (startDevServer) {
    await rsbuild.startDevServer();
  } else {
    await rsbuild.build();
  }
};

type Options = RsbuildConfig & {
  startDevServer?: boolean;
}

export default build;