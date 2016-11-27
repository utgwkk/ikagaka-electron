const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow

const createWindow = () => {
  const size = electron.screen.getPrimaryDisplay().size

  const debug = true;
  if (debug) {
    mainWindow = new BrowserWindow({width: 1024, height: 768})
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow = new BrowserWindow({
      x: 0,
      y: 0,
      width: size.width,
      height: size.height,
      show: true,
      frame: false,
      transparent: true,
      alwaysOnTop: true
    })
    mainWindow.maximize()
    mainWindow.setIgnoreMouseEvents(true)
  }

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
