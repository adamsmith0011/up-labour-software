const { app, BrowserWindow, ipcMain, dialog, Menu, url } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("app/index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("alert-box", (event, data) => {
  const options = {
    type: data.type,
    title: data.title,
    message: data.message,
  };
  let win = BrowserWindow.fromWebContents(event.sender);
  dialog.showMessageBox(win, options);
});

ipcMain.on("open-window", (event, data) => {
  const child = new BrowserWindow({
    parent: BrowserWindow.fromWebContents(event.sender),
    modal: true,
    show: false,
    frame: false,
    resizable: true,
    movable: true,
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: path.join(__dirname, "preload2.js"),
    },
  });

  child.loadURL("https://www.uplmis.in/MobileApp/NewUser/frm_CreateLogin.aspx");
  // child.loadURL("https://google.com");
  // child.loadURL("https://rapidseoservices.in");

  child.once("ready-to-show", () => {
    child.show();
    child.webContents.send("window-form-data", data);
  });

  child.on("close", function () {
    event.reply("open-window-status", "Window Closed");
  });
});

ipcMain.on("win-full", function (event) {
  let win = BrowserWindow.fromWebContents(event.sender);
  if (!win.isMaximized()) {
    win.maximize();
  } else {
    win.unmaximize();
  }
});

ipcMain.on("win-close", function (event, data) {
  BrowserWindow.fromWebContents(event.sender).close();
});

ipcMain.on("win-load-form-complete", (event, data) => {
  let win = BrowserWindow.fromWebContents(event.sender);
  win.loadFile(`${__dirname}/app/form-complete.html`);

  win.webContents.on("did-finish-load", () => {
    win.webContents.send("window-load-form-complete-data", data);
  });
});

Menu.setApplicationMenu(false);
