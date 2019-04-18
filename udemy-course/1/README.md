
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

