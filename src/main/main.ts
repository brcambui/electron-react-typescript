import { app, BrowserWindow } from "electron";

import appUrl from "@/electron/appUrl";
import preloadPath from "@/electron/preloadPath";

const run = async () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: preloadPath
    }
  });
  await mainWindow.loadURL(appUrl);
  mainWindow.show();
  console.log("Main window loaded");
}

app.whenReady().then(run);