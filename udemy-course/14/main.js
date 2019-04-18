//

// Modules to control application life and create native browser window

const {app, BrowserWindow} = require('electron')

const windowStateKeeper = require('electron-window-state');

require('electron-reload')(__dirname);

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
	// Store hash in your password DB.
	console.log('hashed password: ', hash)
});

let mainWindow;

app.on('ready', function (e) {

	let winState = windowStateKeeper({
		defaultWidth: 1200,
		defaultHeight: 600
	});

	mainWindow = new BrowserWindow({
		width: winState.width, height: winState.height,
		x: winState.x, y: winState.y,
		minWidth: 400, minHeight: 200
	});
	winState.manage(mainWindow);

	mainWindow.loadURL(`file://${__dirname}/index.html`);

	mainWindow.on('focus', () => {
		console.log('Main window focused')
	});

  mainWindow.on('closed', function () {
		console.log('on mainWindow closed');
    mainWindow = null;
	});
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
});
