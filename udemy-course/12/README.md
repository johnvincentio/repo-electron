
## Mac

Command Q to quit the process


[Electron](https://electronjs.org/)

[Electron Docs](https://electronjs.org/docs)

[Udemy Course](https://www.udemy.com/master-electron)

[Electron Reload](https://www.npmjs.com/package/electron-reload)

Added to `main.js`

```
require('electron-reload')(__dirname);
```

to allow for code changes to reload the app.

[bcrypt](https://www.npmjs.com/package/bcrypt)

Took code from here and added to `main.js`

```
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
	// Store hash in your password DB.
	console.log('hashed password: ', hash)
});
```

[Using Native Node Modules](https://electronjs.org/docs/tutorial/using-native-node-modules)

This allows the avoidance of the version problem.

jv-build

```
# Electron's version.
export npm_config_target=4.1.4

# The architecture of Electron, can be ia32 or x64.
export npm_config_arch=x64
export npm_config_target_arch=x64

# Download headers for Electron.
export npm_config_disturl=https://atom.io/download/electron

# Tell node-pre-gyp that we are building for Electron.
export npm_config_runtime=electron

# Tell node-pre-gyp to build module from source code.
export npm_config_build_from_source=true

npm install $1
```

where `export npm_config_target=4.1.4` is the version of electron

```
"version": "./node_modules/.bin/electron -v"
```

which I added to package.json

To run 

```
./jv-build bcrypt

npm start
```

## Chrome Devtools

* Start the app `npm start`
* View, Toggle Developer Tools

## Devtron

[Devtron](https://electronjs.org/devtron)

```
npm install --save-dev devtron
```

* Start the app `npm start`
* View, Toggle Developer Tools
From the console

```
require('devtron').install()
```

which adds new tab `Devtron`


## Open the DevTools

```
mainWindow.webContents.openDevTools();
```

## Do not show window until ready to show

```
mainWindow = new BrowserWindow({
	width: 800,
	height: 600,
	backgroundColor: '#ff0000'
	show: false
});

mainWindow.once('ready-to-show', () => {
	mainWindow.show();
});
```



```
// app.setBadgeCount(22);

// console.log(app.getPath('desktop'));
// console.log(app.getPath('music'));
// console.log(app.getPath('temp'));
// console.log(app.getPath('userData'));

// console.log('Is App ready? ', app.isReady());
// setTimeout(function() {
// 	console.log('Is App ready? ', app.isReady());
// }, 3000)

// app.on('before-quit', function(e) {
// 	console.log('before-quit; App is about to quit');
// 	e.preventDefault();
// });

// app.on('browser-window-blur', function(e) {
// 	console.log('browser-window-blur; Window out of focus');
// 	setTimeout(app.quit, 3000);
// });

// app.on('browser-window-focus', function(e) {
// 	console.log('browser-window-focus; Window in focus');
// });
```

## Parent / Child Windows

```
  mainWindow = new BrowserWindow({width: 1200, height: 800});
	childWindow = new BrowserWindow({width: 600, height: 400, parent: mainWindow});
```

## Show Child when Ready

```
	mainWindow.loadFile('index.html');
	childWindow.loadURL(`https://johnvincent.io`);

	childWindow.once('ready-to-show', () => {
		childWindow.show();
	});
```

