
https://jsoneditoronline.org/

‎⁨node --max-old-space-size=8192 index.js

"create-music-data": "node --max-old-space-size=8192 create-music-data/create-all"


launch.json

{
	"type": "node",
	"request": "launch",
	"name": "Launch Create-Music-Data",
	"program": "${workspaceRoot}/create-music-data/create-all.js",
	"runtimeArgs": ["--max-old-space-size=8192"]
}
		

{
"version": "0.2.0",
"configurations": [{
        "type": "node",
        "request": "launch",
        "name": "Launch Server.js",
        "program": "${workspaceRoot}\\server.js"
    },
    {
        "type": "node",
        "request": "launch",
        "name": "Launch Training Script",
        "program": "${workspaceRoot}\\training-script.js",
        "runtimeArgs": [
            "--max-old-space-size=4096"
        ]
    }
]}

## blog

* recursice file lookup
* meta tag lookup

## server.js

```
// app.get('/api/music-folders-data', cors(corsOptions), (req, res) => {
// 	folders = createDataService.createFoldersData(MUSIC_ROOT_DIRECTORY);
// 	res.json({ folders });
// });

// const folder = dataService.createFolderMetaData(folderId);
// console.log('music-folder-metadata; folder (2) ', folder);
// res.json({ folder });

// app.get('/music-data', cors(corsOptions), (req, res) => {
// 	res.sendFile(`${__dirname}/data/music-data.json`);
// });

// app.get('/api/music-json', cors(corsOptions), (req, res) => {
// 	console.log('get /api/music-json');
// 	res.json({ folders: musicData.folders });
// });

// rubbish from here

/*
app.get('/mp3-ok', cors(), (req, res) => {
	res.sendFile(`/Users/jv/tmp/music/1/Yoga/Donna De Lory/The Lover and the Beloved/06 - Samba Sadashiva.mp3`);
});

app.get('/mp3-good', cors(), (req, res) => {
	console.log('req.body ', req.body);
	res.sendFile(`${__dirname}/mp3/jv.mp3`);
});
*/
/*
app.get('/api/music-folder-metadata', cors(corsOptions), (req, res) => {
	const { folderId } = req.params;
	console.log('music-folder-metadata; folderId ', folderId);
	const folder = folders[folderId];
	console.log('music-folder-metadata; folder (1) ', folder);
	createDataService.createFolderMetaData(folder);
	console.log('music-folder-metadata; folder (2) ', folder);
	res.json({ folder });
});
*/
```

## controller

```
// app.get('/api/music-folders-data', cors(corsOptions), (req, res) => {
// 	console.log('/api/music-folders-data');
// 	// folders = dataService.createFoldersData(MUSIC_ROOT_DIRECTORY);
// 	console.log('number of folders ', folders.length);
// 	res.json({ folders });
// });
```

```

	// app.get('/api/mp3/:folder/:track', cors(), (req, res) => {
	// 	const { folder, track } = req.params;
	// 	console.log('get mp3; folder ', folder, ' track ', track);
	// 	const currentFolder = folders[folder];
	// 	const currentTrack = currentFolder.mp3[track];
	// 	const mp3Url = `${currentFolder.dir}/${currentTrack.file}`;
	// 	console.log('returning url ', mp3Url);
	// 	res.sendFile(mp3Url);
	// });
```

Not sure from here

```
// app.get('/api/mp3/:folder/:track', cors(), (req, res) => {
// 	const { folder, track } = req.params;
// 	console.log('get mp3; folder ', folder, ' track ', track);
// 	const currentFolder = folders[folder];
// 	const currentTrack = currentFolder.mp3[track];
// 	const mp3Url = `${currentFolder.dir}/${currentTrack.file}`;
// 	console.log('returning url ', mp3Url);
// 	res.sendFile(mp3Url);
// });

/*
app.get('/api/music-folder-metadata/:id', cors(corsOptions), (req, res) => {
	const { id } = req.params;
	const folderId = parseInt(id, 10);
	console.log('/api/music-folder-metadata; folderId ', folderId);

	console.log('typeof folderId ', typeof folderId);

	const currentFolder = folders[folderId];
	console.log('currentFolder ', currentFolder);
	console.log('/api/music-folder-metadata; stage 1');
	if (!currentFolder.mp3) {
		res.json({ folder: currentFolder });
		return;
	}
	console.log('/api/music-folder-metadata; stage 2');
	if (currentFolder.tags) {
		res.json({ folder: currentFolder });
		return;
	}
	console.log('/api/music-folder-metadata; stage 3');

	const allPromises = [];
	currentFolder.mp3.forEach((file, fileIdx) => {
		// console.log('MakePromise; file.file ', file.file);
		const pathname = `${currentFolder.dir}/${file.file}`;
		// console.log('MakePromise; pathname ', pathname);
		allPromises.push(mediaTags(currentFolder.index, fileIdx, pathname));
	});
	console.log('Finished MakePromises; Number of Promises ', allPromises.length);

	console.log('Start All Promises');
	currentFolder.tags = {};
	Promise.all(allPromises).then(values => {
		console.log('values ', values);
		values.forEach(value => {
			// const folder = folders[value.folderIdx];
			// currentFolder.mp3[value.fileIdx].tags = value;
			const index = value.fileIdx;
			currentFolder.tags[index] = value;
		});
		console.log('Finished All Promises');
		console.log('music-folder-metadata; folder (2) ', currentFolder);
		res.json({ folder: currentFolder });
	});
});
*/

```


## cors

router.route('/music-mp3/:folderId/:trackId')
	.all(validator.params(getMp3Schema, { joi: joiOpts }))
	.get(cors(), getMusicMp3);

options will not work.

