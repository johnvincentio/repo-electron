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

app.setBadgeCount(22);

console.log(app.getPath('desktop'));
console.log(app.getPath('music'));
console.log(app.getPath('temp'));
console.log(app.getPath('userData'));

console.log('Is App ready? ', app.isReady());
setTimeout(function() {
	console.log('Is App ready? ', app.isReady());
}, 3000)

app.on('before-quit', function(e) {
	console.log('before-quit; App is about to quit');
	e.preventDefault();
});

app.on('browser-window-blur', function(e) {
	console.log('browser-window-blur; Window out of focus');
	setTimeout(app.quit, 3000);
});

app.on('browser-window-focus', function(e) {
	console.log('browser-window-focus; Window in focus');
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function (e) {
	console.log('App is now ready');
	console.log('Event ', e);

  mainWindow = new BrowserWindow({
    width: 800,
		height: 600,
		backgroundColor: '#ff0000'
		// show: false
	});
	
	// mainWindow.once('ready-to-show', () => {
	// 	mainWindow.show();
	// });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
		console.log('on mainWindow closed')
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
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
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
