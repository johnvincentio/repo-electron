// DataService

const fs = require('fs');

const mediaTags = require('./mediaTags').mediatags;

class DataService {
	constructor() {
		this.folders = [];
	}

	getFolders() {
		return this.folders;
	}

	createFoldersData(rootDirectory) {
		console.log('createDataUtilities::createFoldersData ', rootDirectory);
		console.log('Start createFoldersData');
		this.folders = [];
		this.getFiles(null, '/', rootDirectory);
		console.log('Finished createFoldersData ', this.folders.length);
		return this.folders;
	}

	getFiles(parentIndex, name, dir) {
		const index = this.folders.length;
		this.folders[index] = {
			index,
			name,
			dir,
			previous: parentIndex,
			next: [],
			mp3: [],
			jpg: []
		};

		if (parentIndex !== null) {
			const arr = this.folders[parentIndex].next;
			if (arr.findIndex(k => k === index) < 0) {
				arr.push(index);
			}
		}

		fs.readdirSync(dir).forEach(file => {
			const pathname = `${dir}/${file}`;
			// console.log('pathname :', pathname, ':');
			const stats = fs.statSync(pathname);

			if (stats.isFile()) {
				if (file.search(/\.jpg$/) > -1) {
					this.folders[index].jpg.push(file);
				}

				if (file.search(/\.mp3$/) > -1) {
					// const sub = { file };
					const idx = this.folders[index].mp3.length;
					this.folders[index].mp3.push({ index: idx, file });
					// obj.folder.files.push(sub);
				}
			}
			if (stats.isDirectory()) {
				this.getFiles(index, file, pathname);
				// obj.folder.folders.push(sub);
			}
		});
	}
	// 	mainWindow.webContents.send('metadata:complete', { folders });

	getMusicFolderMetaData(mainWindow, folderId) {
		const currentFolder = this.folders[folderId];
		console.log('currentFolder ', currentFolder);
		if (!currentFolder.mp3) {
			mainWindow.webContents.send('metadata:complete', {
				folder: currentFolder
			});
			return;
		}

		if (currentFolder.tags) {
			mainWindow.webContents.send('metadata:complete', {
				folder: currentFolder
			});
			return;
		}

		const allPromises = [];
		currentFolder.mp3.forEach((file, fileIdx) => {
			// console.log('MakePromise; file.file ', file.file);
			const pathname = `${currentFolder.dir}/${file.file}`;
			// console.log('MakePromise; pathname ', pathname);
			allPromises.push(mediaTags(currentFolder.index, fileIdx, pathname));
		});
		// prettier-ignore
		console.log('Finished MakePromises; Number of Promises ', allPromises.length);

		console.log('Start All Promises');
		currentFolder.tags = {};
		Promise.all(allPromises).then(values => {
			// console.log('values ', values);
			values.forEach(value => {
				// const folder = folders[value.folderIdx];
				// currentFolder.mp3[value.fileIdx].tags = value;
				const index = value.fileIdx;
				currentFolder.tags[index] = value;
			});
			console.log('Finished All Promises', currentFolder);
			mainWindow.webContents.send('metadata:complete', {
				folder: currentFolder
			});
		});
	}
}

module.exports = DataService;
