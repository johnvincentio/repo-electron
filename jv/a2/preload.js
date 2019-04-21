//

// window.ipcRenderer = require('electron').ipcRenderer;

const { dialog } = require('electron').remote.dialog;

console.log('in preload.js');

window.electron = {};
window.electron.dialog = dialog;

const jsmediatags = require('jsmediatags');

window.jsmediatags = jsmediatags;

const { ipcRenderer } = require('electron');

window.ipcRenderer = ipcRenderer;

console.log('window.ipcRenderer ', window.ipcRenderer);
