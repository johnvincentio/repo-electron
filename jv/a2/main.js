//

// Modules to control application life and create native browser window

const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const fs = require('fs');
const jsmediatags = require('jsmediatags');
const btoa = require('btoa');

const windowStateKeeper = require('electron-window-state');

const searchMP3 = require('./utils/searchMP3');

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
		minHeight: 200,
		webPreferences: {
			webSecurity: false,
			nodeIntegration: true,
			preload: `${__dirname}/preload.js`
		}
	});
	winState.manage(mainWindow);

	mainWindow.loadURL('http://localhost:8001/');

	mainWindow.webContents.openDevTools();

	// mainWindow.on('focus', () => {
	// 	console.log('Main window focused');
	// });

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

ipcMain.on('open-file', (event, arg) => {
	console.log('main.js::open-file');
	const file = dialog.showOpenDialog({
		title: 'MP3 File',
		filters: [
			{
				name: 'Audio Files',
				extensions: ['mp3']
			}
		],
		properties: ['openFile']
	});

	if (file == null) return;

	fs.readFile(file[0], (err, data) => {
		if (err) console.log(err);

		const dataFormat = {
			title: file[0],
			format: file[0]
		};

		jsmediatags.read(dataFormat.title, {
			onSuccess: tag => {
				const dataUrlImage = false;

				dataFormat.image = dataUrlImage || null;
				dataFormat.realTitle = tag.tags.title || 'Unknown title';
				dataFormat.artist = tag.tags.artist || 'Unknown artist';
				dataFormat.album = tag.tags.album || 'Unknown album';
				dataFormat.year = tag.tags.year || 'Unknown year';
				dataFormat.genre = tag.tags.genre || 'Unknown genre';
				event.sender.send('opened-file', {
					file: dataFormat,
					error: null
				});
			},
			onError: error => {
				event.sender.send('opened-file', {
					file: '',
					error: true
				});
				console.log('Error getting tags', error.type, error.info);
			}
		});
	});
});

ipcMain.on('open-folder', (event, arg) => {
	console.log('main.js::open-folder');
	const folder = dialog.showOpenDialog({
		title: 'Open Folder',
		properties: ['openDirectory']
	});

	if (folder == null) return;

	console.log('folder ', folder);
	const mp3List = searchMP3(folder);
	const modifiedList = [];

	console.log('mp3List ', mp3List);

	mp3List.forEach((item, index) => {
		const dataFormat = {
			title: item,
			format: item
		};

		jsmediatags.read(dataFormat.title, {
			onSuccess: tag => {
				const dataUrlImage = false;

				dataFormat.image = dataUrlImage || null;
				dataFormat.realTitle = tag.tags.title || 'Unknown title';
				dataFormat.artist = tag.tags.artist || 'Unknown artist';
				dataFormat.album = tag.tags.album || 'Unknown album';
				dataFormat.year = tag.tags.year || 'Unknown year';
				dataFormat.genre = tag.tags.genre || 'Unknown genre';

				modifiedList.push(dataFormat);

				if (index >= mp3List.length - 1) {
					fs.writeFileSync('userData.json', '');
					fs.writeFileSync(
						'userData.json',
						JSON.stringify({
							SongList: modifiedList
						})
					);

					event.sender.send('opened-folder', {
						list: modifiedList,
						error: null
					});
				}
			},
			onError: error => {
				event.sender.send('opened-folder', {
					list: '',
					error: true
				});
				console.log('Error getting tags', error.type, error.info);
			}
		});
	});
});

/*
	let defaultSession = session.defaultSession;

	let mainSession = mainWindow.webContents.session;
	let altSession = altWindow.webContents.session;

	console.log('Compare main and alt ', Object.is(mainSession, altSession));

	console.log('Compare main and app ', Object.is(mainSession, appSession));

	mainWindow.loadURL(`file://${__dirname}/index.html`);
	altWindow.loadURL(`file://${__dirname}/index.html`);

	mainWindow.webContents.openDevTools();
*/
