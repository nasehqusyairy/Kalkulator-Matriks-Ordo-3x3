const { ipcRenderer } = require('electron');
ipcRenderer.on('message', (event, text) => {
  let el = document.getElementById('message')
  if (el) {
    el.innerHTML = text
  }
})
