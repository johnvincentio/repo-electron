
// runs with the nodeJS environment, does not support ES6

const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
	mainWindow = new BrowserWindow({width: 800, height: 600, webPreferences: {
		nodeIntegration: true
	}});
	mainWindow.loadURL(`file://${__dirname}/index.html`);
	mainWindow.webContents.openDevTools();
	mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

ipcMain.on('video:submit', (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    console.log('Video duration is:', metadata.format.duration)
    mainWindow.webContents.send(
      'video:metadata',
      metadata.format.duration
    );
  });
});
