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

let mainWindow;
let secWindow;

app.on('browser-window-focus', () => {
	console.log('browser-window-focus')
});

app.on('ready', function (e) {

	mainWindow = new BrowserWindow({width: 1200, height: 800, minWidth: 400, minHeight: 200});
	secWindow = new BrowserWindow({width: 800, height: 500, minWidth: 400, minHeight: 200});

	mainWindow.loadURL(`file://${__dirname}/index.html`);
	secWindow.loadURL(`file://${__dirname}/index.html`);

	mainWindow.on('focus', () => {
		console.log('Main window focused')
	});
	secWindow.on('focus', () => {
		console.log('secWindow window focused')
	});

	secWindow.on('blur', () => {
		console.log('secWindow window blur');
		mainWindow.close();
	});

  mainWindow.on('closed', function () {
		console.log('on mainWindow closed');
    mainWindow = null;
	});
	secWindow.on('closed', function () {
		console.log('on secWindow closed');
    secWindow = null;
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
