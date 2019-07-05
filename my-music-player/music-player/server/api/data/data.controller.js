//

const { logger } = require('../../config/logger');

const DataService = require('./data.service.js');

const mediaTags = require('./mediaTags').mediatags;

const dataService = new DataService();

let folders = [];

const dataController = {
	getMusicFoldersData(req, res) {
		logger.info(`--- data.controller::getMusicFoldersData`);

		folders = dataService.createFoldersData();
		logger.info(`Retrieved FoldersData`);
		res.status(200).json({ folders });
	},

	getMusicMp3(req, res) {
		const { folderId, trackId } = req.params;
		logger.info('--- data.controller::getMusicMp3; folderId ', folderId, ' trackId ', trackId);
		const currentFolder = folders[folderId];
		const currentTrack = currentFolder.mp3[trackId];
		const mp3Url = `${currentFolder.dir}/${currentTrack.file}`;
		console.log('returning url ', mp3Url);
		res.sendFile(mp3Url);
	},

	getMusicFolderMetaData(req, res) {
		logger.info(`--- data.controller::getMusicFolderMetaData`);
		const { folderId } = req.params;

		const currentFolder = folders[folderId];
		console.log('currentFolder ', currentFolder);
		if (!currentFolder.mp3) {
			res.json({ folder: currentFolder });
			return;
		}

		if (currentFolder.tags) {
			res.json({ folder: currentFolder });
			return;
		}

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
			// console.log('values ', values);
			values.forEach(value => {
				// const folder = folders[value.folderIdx];
				// currentFolder.mp3[value.fileIdx].tags = value;
				const index = value.fileIdx;
				currentFolder.tags[index] = value;
			});
			console.log('Finished All Promises', currentFolder);
			res.json({ folder: currentFolder });
		});
	}
};

module.exports = dataController;
