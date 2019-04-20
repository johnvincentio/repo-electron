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

	mainWindow = new BrowserWindow({width: 800, height: 600});

	mainWindow.loadURL(`file://${__dirname}/index.html`);

	let mainContents = mainWindow.webContents;

	mainContents.on('context-menu', (e, params) => {
		// console.log('Context menu opened on: ', params.mediaType, 
		// 	' at x: ', params.x, ' at y: ', params.y);
		console.log('User selected text: ', params.selectionText);
		console.log('Selection can be copied: ', params.editFlags.canCopy);
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
