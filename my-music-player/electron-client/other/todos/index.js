// runs with the nodeJS environment, does not support ES6

const electron = require('electron');
const path = require('path');

const { app, BrowserWindow, ipcMain, Menu } = electron;

let mainWindow;
let addWindow;

console.log(`dirname ${__dirname}`);

const srcPath = path.join(__dirname, '..', '/src');
console.log('srcPath ', srcPath);

app.on('ready', () => {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	});
	mainWindow.loadURL(`file://${__dirname}/main.html`);
	mainWindow.webContents.openDevTools();
	mainWindow.on('closed', () => app.quit());

	const mainMenu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(mainMenu);
});

const createAddWindow = () => {
	addWindow = new BrowserWindow({
		width: 300,
		height: 200,
		title: 'Add New Todo',
		webPreferences: {
			nodeIntegration: true
		}
	});
	addWindow.loadURL(`file://${__dirname}/add.html`);
	addWindow.on('closed', () => (addWindow = null));
};

ipcMain.on('todo:add', (event, todo) => {
	mainWindow.webContents.send('todo:add', todo);
	addWindow.close();
});

const menuTemplate = [
	{
		label: 'File',
		submenu: [
			{
				label: 'New Todo',
				click() {
					createAddWindow();
				}
			},
			{
				label: 'Clear Todos',
				click() {
					mainWindow.webContents.send('todo:clear');
				}
			},
			{
				label: 'Quit',
				accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
				click() {
					app.quit();
				}
			}
		]
	}
];

if (process.platform === 'darwin') {
	menuTemplate.unshift({ label: '' });
}

if (process.env.NODE_ENV !== 'production')
	menuTemplate.push({
		label: 'Developer',
		submenu: [
			{ role: 'reload' },
			{
				label: 'Toggle Developer Tools',
				accelerator: 'Command+Option+I',
				click(item, focusedWindow) {
					focusedWindow.toggleDevTools();
				}
			}
		]
	});
