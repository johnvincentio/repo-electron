//

// Modules to control application life and create native browser window

const {app, BrowserWindow, session} = require('electron')

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
let altWindow;

app.on('ready', function (e) {

	let appSession = session.fromPartition('partition1');

	mainWindow = new BrowserWindow({width: 800, height: 600});
	altWindow = new BrowserWindow({width: 600, height: 400, webPreferences: {session: appSession}});

	let defaultSession = session.defaultSession;

	let mainSession = mainWindow.webContents.session;
	let altSession = altWindow.webContents.session;

	console.log('Compare main and alt ', Object.is(mainSession, altSession));

	console.log('Compare main and app ', Object.is(mainSession, appSession));

	mainWindow.loadURL(`file://${__dirname}/index.html`);
	altWindow.loadURL(`file://${__dirname}/index.html`);

	mainWindow.webContents.openDevTools();
	altWindow.webContents.openDevTools();

	mainWindow.on('closed', function () {mainWindow = null;});
	altWindow.on('closed', function () {altWindow = null;});
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
