const  { app, BrowserWindow, dialog, ipcMain  } = require('electron');
const fs = require('fs');
const jsmediatags = require('jsmediatags');
const btoa = require('btoa');

const searchMP3 = require('./utils/searchMP3');

function createWindow() {
    let win = new BrowserWindow({ width: 400, height: 600, minWidth:350, minHeight: 400, webPreferences: { webSecurity: false }});

    win.loadURL('http://localhost:7777/');

    BrowserWindow.addDevToolsExtension('C:\\Users\\WIN 10\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\3.2.1_0');
    win.setMenuBarVisibility(false);
    win.webContents.openDevTools();
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
});
  
app.on('activate', () => {
// On macOS it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

ipcMain.on('open-file', (event, arg) => {
    let file = dialog.showOpenDialog({
        title: 'MP3 File', 
        filters: [
            { 
                name: 'Audio Files', 
                extensions: ['mp3']
            }
        ], 
        properties: ['openFile']
    });

    if(file == null) return;

    fs.readFile(file[0], (err, data) => {
        if(err) console.log(err);
    
        let dataFormat = { 
            title: file[0],
            format: file[0]
        };

        jsmediatags.read(dataFormat.title, {
            onSuccess: (tag) => {
                let dataUrlImage = false;
                
                dataFormat.image = dataUrlImage || null;
                dataFormat.realTitle = tag.tags.title || 'Unknown title';
                dataFormat.artist = tag.tags.artist || 'Unknown artist';
                dataFormat.album = tag.tags.album || 'Unknown album';
                dataFormat.year = tag.tags.year || 'Unknown year';
                dataFormat.genre = tag.tags.genre || 'Unknown genre';
                event.sender.send('opened-file',{ 
                    file: dataFormat, 
                    error: null
                });
            },
            onError: (error) => {
                event.sender.send('opened-file',{ 
                    file: "", 
                    error: true
                });
                console.log('Error getting tags', error.type, error.info);
            }
        });  
    });
});

ipcMain.on('open-folder', (event, arg) => {
    let folder = dialog.showOpenDialog({
        title: 'Open Folder',
        properties: ['openDirectory']
    });

    if(folder == null) return;

    let mp3List = searchMP3(folder);
    let modifiedList = [];
    
    mp3List.forEach((item, index) => {
        let dataFormat = { 
            title: item,
            format: item
        };

        jsmediatags.read(dataFormat.title, {
            onSuccess: (tag) => {
                let dataUrlImage = false;
                
                dataFormat.image = dataUrlImage || null;
                dataFormat.realTitle = tag.tags.title || 'Unknown title';
                dataFormat.artist = tag.tags.artist || 'Unknown artist';
                dataFormat.album = tag.tags.album || 'Unknown album';
                dataFormat.year = tag.tags.year || 'Unknown year';
                dataFormat.genre = tag.tags.genre || 'Unknown genre';
            
                modifiedList.push(dataFormat);
                
                if(index >= mp3List.length - 1) {
                    fs.writeFileSync('userData.json', '');
                    fs.writeFileSync('userData.json', JSON.stringify({
                        SongList: modifiedList,
                    }));

                    event.sender.send('opened-folder',{ 
                        list: modifiedList, 
                        error: null
                    });
                }
            },
            onError: (error) => {
                event.sender.send('opened-folder',{ 
                    list: "", 
                    error: true
                });
                console.log('Error getting tags', error.type, error.info);
            }
        });
    });
});