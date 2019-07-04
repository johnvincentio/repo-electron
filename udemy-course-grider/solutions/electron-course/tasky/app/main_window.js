const electron = require('electron');

const {BrowserWindow} = electron;

class MainWindow extends BrowserWindow {
  constructor(url) {
    super({
      width: 300,
      height: 500,
      frame: false,
      resizable: false,
      show: false,
      webPreferences: {backgroundThrottling: false}
    });

    this.loadURL(url);

    this.on('blur', () => {
      this.hide();
    });
  }
}

module.exports = MainWindow;
