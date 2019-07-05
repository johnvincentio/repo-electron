// DataService

const fs = require('fs');
// const mediaTags = require('../../utilities/mediaTags').mediatags;

const { MUSIC_ROOT_DIRECTORY } = require('../../config/config');

class DataService {
	constructor() {
		this.folders = [];
	}

	createFoldersData() {
		// console.log('createDataUtilities::createFoldersData ', MUSIC_ROOT_DIRECTORY);
		console.log('Start createFoldersData');
		this.folders = [];
		this.getFiles(null, '/', MUSIC_ROOT_DIRECTORY);
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
}

module.exports = DataService;
