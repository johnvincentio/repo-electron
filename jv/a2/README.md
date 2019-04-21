    "name": "electron-quick-start",
    "version": "1.0.0",
    "description": "A minimal Electron application",
    "main": "main.js",
    "scripts": {
    	"start-old": "electron .",
    	"start": "./node_modules/.bin/electron .",
    	"version": "./node_modules/.bin/electron -v"
    },
    "repository": "https://github.com/electron/electron-quick-start",
    "keywords": [
    	"Electron",
    	"quick",
    	"start",
    	"tutorial",
    	"demo"
    ],
    "author": "GitHub",
    "license": "CC0-1.0",
    "devDependencies": {
    	"devtron": "^1.4.0",
    	"electron": "^4.1.4",
    	"electron-reload": "^1.4.0"
    },
    "dependencies": {
    	"bcrypt": "^3.0.6",
    	"electron-window-state": "^5.0.3"
    }

const { app, BrowserWindow } = require('electron');

const windowStateKeeper = require('electron-window-state');

require('electron-reload')(\_\_dirname);

## Install

npm i electron electron-reload electron-window-state --save
npm i devtron --save-dev
