const { app, BrowserWindow, shell } = require("electron");
const path = require("path");
const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
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

  // Load app
  if (isDev) {
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "../build/index.html"));
  }

  // Show window once ready (prevents white flash)
  win.once("ready-to-show", () => {
    win.show();
  });

  // Open external links in browser, not Electron
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
