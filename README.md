# Electron + React + Typescript
A scalable project structure to get started developing with Electron. It uses [Webpack](https://webpack.js.org/) to provide development and production-ready environments.

This template comes with:
- Auto-reload in both main and renderer processes.
- Sass support, including `.sass`, `.scss`, `.module.scss` files.
- Support for [native modules](https://www.electronjs.org/docs/latest/tutorial/using-native-node-modules) like [`sqlite3`](https://github.com/TryGhost/node-sqlite3).

## Get started
Make sure you have [Node.js](https://nodejs.org/) and [Yarn PnP](https://yarnpkg.com/getting-started/install) installed.

Clone this repo:
```bash
git clone --depth 1 --branch master https://github.com/brcambui/electron-react-typescript.git your-project-name

cd your-project-name
```

Use Yarn PnP to install all dependencies:

> #### ⚠️ Install only with Yarn PnP 
> This project does not support the classic Yarn (v1.x). This was necessary in order to be able to install native modules. Here are the [instructions to install Yarn PnP](https://yarnpkg.com/getting-started/install).

```bash
yarn
```

Start the application by running the `dev` command:
```bash
yarn dev
```

Your project is now running in development mode 🥳

## Project structure
All of your code should be added inside the `src/` folder.

We organized this project in 3 main folders:
#### `src/common/`
All the code here is accesible from both `main` and `renderer` processes. This is useful for shared logic between these two processes. Files inside the common folder should not contain code that runs only on `main` or `renderer`.
#### `src/main/`
Specific code for the `main` process. This folder should not contain code that runs only on `render` (e.g. `.tsx` files).
#### `src/renderer/`
Specific code for the `renderer` process. This folder should not contain code that runs only on `main` (e.g. native modules, `fs`, `os`, etc).

### Typescript paths
We added some typescript paths for convenience while you are developing:
- `@/common/` ➡️ `src/common/`
- `@/main/` ➡️ `src/main/`
- `@/renderer/` ➡️ `src/renderer/`
- `@/electron/` ➡️ `electron/helpers/`

Here are an example of how you should use the `@/common/` path:
```ts
// src/common/getDate.ts
const getDate = () => new Date().toLocaleString()
export default getDate

// This should work in both main and renderer process
import getDate from "@/common/getDate"
const date = getDate()
```

### Electron helpers
We also added some helpers inside the `electron/helpers/` folder. This directory contains some useful methods:

> #### Do not modify these files. They are also used during the build process in both dev and production environments. If you need to add some functionality, please do it in the `src/` folder.

#### `@/electron/appUrl`
Contains the app url that you should use while creating a new [BrowserWindow](https://www.electronjs.org/docs/latest/api/browser-window).
```ts
import { BrowserWindow } from "electron"
import appUrl from "@/electron/appUrl"

const win = new BrowserWindow({ 
  width: 800,
  height: 600
})

await win.loadUrl(appUrl)
```

#### `@/electron/paths`
A list of paths that are used during the build process and can also be accessed in the main process.
```ts
import { BrowserWindow } from "electron"
import paths from "@/electron/paths"

const win = new BrowserWindow({ 
  width: 800,
  height: 600,
  webPreferences: {
    preload: paths.preload // <= here
  }
})
```

#### `@/electron/port`
Contains the port used by the [webpack-dev-server](https://webpack.js.org/configuration/dev-server/). Here are some considerations about the port:
  - The default port is 3000
  - You can set the environment variable PORT to change the port used by the webpack-dev-server.

#### `@/electron/resourcesPath`
Contains the resources path. See more in the [acessing resource files](#acessing-resource-files-programatically) section.

## Building
You can generate a production build for the current OS by running the `build` command:

```bash
yarn build
```

This command will generate a `dist/` folder which the following artifacts:
- Installer
- Unpacked version

### Changing the configuration
This project uses [electron-builder](https://www.electron.build/). The configuration file for the electron-builder is located at `electron/electron-builder.json`. You can access the [electron-builder documentation](https://www.electron.build/configuration/configuration) to see all the available settings.


### Adding resources
You can provide additional resources to your application by adding files in the resources folder. All files inside this folder will be packed inside your application.

The following file types are supported on the renderer process by default:

| Type  | Extensions                                |
| --    | --                                        |
| Image | `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`   |
| Font  | `.woff`, `.woff2`, `.eot`, `.ttf`, `.otf` |

You can add more file extensions or change the file loader configuration by editing the `electron/webpack/renderer.[dev|prod].ts` files.

### Changing the icon
You can change the app icon by modifying the files inside `resources/icons/`.

There are several guidelines for displaying an icon depending on the OS you are building the application on. We recommend that you follow the [electron-builder documentation](https://www.electron.build/icons.html) to generate new icons.

### Acessing resource files programatically
You can access a file inside the resources directory using the following code:
```ts
import path from "path"
import fs from "fs"
import resourcesPath from "@/electron/resourcesPath"

const fileLocation = path.join(resourcesPath, "file.txt")
const content = fs.readFileSync(fileLocation).toString()
```

## Native modules
If your application uses [native modules](https://www.electronjs.org/docs/latest/tutorial/using-native-node-modules), Electron needs to rebuild them so you can access the native bindings in the main process.

This project uses [electron-builder](https://www.electron.build/), which automatically detects native modules and recompile them for Electron.

### Node-gyp
In order to rebuild, your native modules may depend on node-gyp and requires a previous configuration step.

See more about configuring your local environment to run node-gyp:
- [Unix](https://github.com/nodejs/node-gyp?tab=readme-ov-file#on-unix)
- [macOS](https://github.com/nodejs/node-gyp?tab=readme-ov-file#on-macos)
- [Windows](https://github.com/nodejs/node-gyp?tab=readme-ov-file#on-windows)

#### Error while building native modules
This is probably because some of your native modules are using an older version of node-gyp. You can try adding the following lines to your `package.json`:
```json
{
  // ...
  "resolutions": {
    "node-gyp": "10.0.1" // Change the version according to your need
  }
}
```

## Roadmap
- [x] Sass support
- [x] Native module support
- [ ] Load automatically `.env`, `.env.development`, `.env.production` files
- [ ] Provide a deploy command
- [ ] Provide auto-updater examples for AWS S3 and GitHub

## Acknowledgements
This project is heavily inspired on the [electron-react-boilerplate](https://electron-react-boilerplate.js.org/). Several configuration files are based on their settings with minor changes.

## License
This project is available under the MIT license. See the 
[LICENSE file](LICENSE) for details.