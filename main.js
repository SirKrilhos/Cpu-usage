const { app, BrowserWindow, CPUUsage } = require('electron');
const chart = require('electron-chartjs')
const os = require("os-utils");
const path = require("path");

function createWindow () {
  // Cria uma janela de navegação.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 745,
    minHeight: 445,
    backgroundColor: '#2e2c29',
    fullscreenable: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  // win.webContents.openDevTools()

  setInterval(() => {
    os.cpuUsage(function (v) {
      win.webContents.send("cpu", v * 100);
      win.webContents.send("mem", os.freememPercentage() * 100);
      win.webContents.send("total-mem", os.totalmem() / 1024);
    });
  }, 1000);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // No macOS é comum para aplicativos e sua barra de menu
  // permaneçam ativo até que o usuário explicitamente encerre com Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. Você também pode colocar eles em arquivos separados e requeridos-as aqui.
