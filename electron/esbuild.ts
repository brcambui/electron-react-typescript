import fs from "fs";
import dotenv from "dotenv";
import esbuild from "esbuild";

const defaultOptions: esbuild.BuildOptions = {
  bundle: true,
  platform: "node",
  sourcemap: true,
  minify: true,
  external: [
    "electron",
    "pnpapi"
  ],
  loader: {
    ".node": "copy" // for native modules
  }
};

const defineVars = (envFilePath: string) => {
  if (!fs.existsSync(envFilePath)) return;
  const envFile = fs.readFileSync(envFilePath, "utf-8");
  const envVars = dotenv.parse(envFile);
  const vars = Object.fromEntries(Object.entries(envVars)
    .map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)])
  );
  // Native modules may depend on platform and architecture
  vars["process.platform"] = JSON.stringify(process.platform);
  vars["process.arch"] = JSON.stringify(process.arch);
  return vars;
};

const build = async ({ envFilePath, ...options }: Options = {}) => {
  const buildOptions: esbuild.BuildOptions = {
    ...defaultOptions,
    ...options,
    define: {
      ...(options.define || {}),
      ...defineVars(envFilePath || ".env")
    }
  };
  await esbuild.build(buildOptions);
};

type Options = Omit<esbuild.BuildOptions, "define"> & {
  envFilePath?: string;
  define?: { [key: string]: string };
};

export default build;