//

// Modules to control application life and create native browser window

const { app, BrowserWindow } = require('electron');

const windowStateKeeper = require('electron-window-state');

require('electron-reload')(__dirname);

let mainWindow;

console.log('in main.js');

function createWindow() {
	console.log('in createWindow');
	const winState = windowStateKeeper({
		defaultWidth: 1200,
		defaultHeight: 600
	});

	mainWindow = new BrowserWindow({
		width: winState.width,
		height: winState.height,
		x: winState.x,
		y: winState.y,
		minWidth: 400,
		minHeight: 200
	});
	winState.manage(mainWindow);

	mainWindow.loadURL('http://localhost:8001/');

	mainWindow.on('focus', () => {
		console.log('Main window focused');
	});

	mainWindow.on('closed', () => {
		console.log('on mainWindow closed');
		mainWindow = null;
	});
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) createWindow();
});
