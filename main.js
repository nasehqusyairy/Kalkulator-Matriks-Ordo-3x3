const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const package = require('./package.json')
const path = require('path');
const exp = express()
const port = 3000

exp.set('views', path.join(__dirname, '/views'));

exp.set('view engine', 'ejs')
exp.use(express.static(path.join(__dirname, '/public')))

let progress

exp.use(expressLayouts)

exp.get('/', (req, res) => {
  res.render('home', {
    layout: 'layouts/blank-layout',
    version: package.version,
    updating: progress
  })
})

exp.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layouts/blank-layout'
  })
})

exp.get('/penjumlahan', (req, res) => {
  res.render('operasi', {
    title: 'Penjumlahan Matriks',
    method: 'penjumlahan',
    layout: 'layouts/main-layout'
  })
})
exp.get('/pengurangan', (req, res) => {
  res.render('operasi', {
    title: 'Pengurangan Matriks',
    method: 'pengurangan',
    layout: 'layouts/main-layout'
  })
})
exp.get('/perkalian', (req, res) => {
  res.render('operasi', {
    title: 'Perkalian Matriks',
    method: 'perkalian',
    layout: 'layouts/main-layout'
  })
})
exp.get('/determinan', (req, res) => {
  res.render('determinan', {
    title: 'Determinan Matriks',
    method: 'tampilkanDeterminan',
    layout: 'layouts/main-layout'
  })
})
exp.get('/inverse', (req, res) => {
  res.render('inverse', {
    title: 'Inverse Matriks',
    method: 'inverse',
    layout: 'layouts/main-layout'
  })
})

exp.listen(port, () => {
  console.log(`opened server on http://localhost:${port}`)
})

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const { autoUpdater } = require("electron-updater")

let win

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    webPreferences: {
      devTools: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index of the app.
  win.loadURL(`http://localhost:${port}`)
  win.setMenuBarVisibility(false)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Auto Update
app.on('ready', function () {
  autoUpdater.checkForUpdatesAndNotify();
});

function dispatch(data) {
  win.webContents.send('message', '- ' + data)
}

autoUpdater.on('update-available', (info) => {
  dispatch('Pembaruan Tersedia!')
})
autoUpdater.on('download-progress', (progressObj) => {
  dispatch('Memperbarui...' + parseInt(progressObj.percent) + '%')
})
autoUpdater.on('update-downloaded', (info) => {
  dispatch('Pembaruan selesai!')
});