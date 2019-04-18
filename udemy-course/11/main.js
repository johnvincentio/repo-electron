//

// Modules to control application life and create native browser window

const {app, BrowserWindow} = require('electron')

require('electron-reload')(__dirname);

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
	// Store hash in your password DB.
	console.log('hashed password: ', hash)
});

let mainWindow

app.on('ready', function (e) {
	console.log('App is now ready');
	console.log('Event ', e);

  mainWindow = new BrowserWindow({width: 1200, height: 800});
	// childWindow = new BrowserWindow({width: 600, height: 400, parent: mainWindow});
	childWindow = new BrowserWindow(
		{width: 600, height: 400, parent: mainWindow, modal: true, show: false}
	);

  // and load the index.html of the app.
	mainWindow.loadFile('index.html');
	// childWindow.loadFile('index_child.html');
	childWindow.loadURL(`https://johnvincent.io`);

	childWindow.once('ready-to-show', () => {
		childWindow.show();
	});

  mainWindow.on('closed', function () {
		console.log('on mainWindow closed');
    mainWindow = null;
	});
	childWindow.on('closed', function () {
		console.log('on childWindow closed');
    childWindow = null;
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
