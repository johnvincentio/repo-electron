//

// window.ipcRenderer = require('electron').ipcRenderer;

const { dialog } = require('electron').remote.dialog;

// const { ipcMain } = require('electron').remote.ipcMain;

console.log('in preload.js');

// const abc = require('electron').remote;
// console.log('preload.js; abc ', abc);

window.electron = {};
window.electron.dialog = dialog;

// window.electron.ipcMain = ipcMain;

const jsmediatags = require('jsmediatags');

window.electron.jsmediatags = jsmediatags;

const { ipcRenderer } = require('electron');

console.log('preload; ipcRenderer ', ipcRenderer);

window.electron.ipcRenderer = ipcRenderer;

console.log('window.electron.ipcRenderer ', window.electron.ipcRenderer);
