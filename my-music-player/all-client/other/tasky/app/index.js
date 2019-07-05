const path = require('path');
const electron = require('electron');
const TimerTray = require('./timer_tray');
const MainWindow = require('./main_window');

const { app, ipcMain } = electron;

let mainWindow;
let tray;

const srcPath = path.join(__dirname, '..', '/src');
console.log('srcPath ', srcPath);

app.on('ready', () => {
	app.dock.hide();

	mainWindow = new MainWindow(`file://${srcPath}/index.html`);

	const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
	tray = new TimerTray(path.join(srcPath, `./assets/${iconName}`), mainWindow);
});

ipcMain.on('update-timer', (event, timeLeft) => {
	tray.setTitle(timeLeft);
});
