const { app, BrowserWindow, shell, dialog, ipcMain } = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");
const isDev = !app.isPackaged;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    title: "FarmLogic",
    icon: path.join(__dirname, "../public/icon.ico"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
    },
    backgroundColor: "#0a0c0e",
    show: false,
    titleBarStyle: "default",
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
  }

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    // Check for updates 3 seconds after launch (not in dev mode)
    if (!isDev) {
      setTimeout(() => checkForUpdates(), 3000);
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
}

function checkForUpdates() {
  autoUpdater.checkForUpdates().catch(() => {
    // Silently fail if no internet connection
  });
}

// ── Auto-updater events ───────────────────────────────────────
autoUpdater.on("update-available", (info) => {
  dialog.showMessageBox(mainWindow, {
    type: "info",
    title: "FarmLogic Update Available",
    message: `Version ${info.version} is available!`,
    detail: "A new version of FarmLogic is available. It will download in the background and install when you restart the app.",
    buttons: ["Download Update", "Later"],
    defaultId: 0,
  }).then((result) => {
    if (result.response === 0) {
      autoUpdater.downloadUpdate();
    }
  });
});

autoUpdater.on("update-downloaded", () => {
  dialog.showMessageBox(mainWindow, {
    type: "info",
    title: "Update Ready",
    message: "FarmLogic update downloaded!",
    detail: "The update has been downloaded. Restart FarmLogic now to install the new version.",
    buttons: ["Restart Now", "Later"],
    defaultId: 0,
  }).then((result) => {
    if (result.response === 0) {
      autoUpdater.quitAndInstall();
    }
  });
});

autoUpdater.on("error", () => {
  // Silently ignore update errors
});

// ── App lifecycle ─────────────────────────────────────────────
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
