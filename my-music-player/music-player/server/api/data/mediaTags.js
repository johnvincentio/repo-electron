//

const jsmediatags = require('jsmediatags');

function mediatags(folderIdx, fileIdx, filename) {
	// console.log('--- mediatags; filename :', filename, ':');
	// console.log('folderIdx ', folderIdx);
	// console.log('fileIdx ', fileIdx);
	return new Promise((resolve, reject) => {
		jsmediatags.read(filename, {
			onSuccess(tag) {
				// console.log('onSuccess; tag ', tag);
				const obj = { folderIdx, fileIdx };
				obj.album = tag.tags.album;
				obj.artist = tag.tags.artist;
				obj.genre = tag.tags.genre;
				obj.title = tag.tags.title;
				obj.year = tag.tags.year;
				resolve(obj);
			},
			onError(error) {
				console.error('onError; error ', error);
				reject(error);
			}
		});
	});
}

module.exports = { mediatags };

// .then(tags => {
// 	console.log('tags ', tags);
// 	return tags;
// })
// .catch(error => {
// 	console.log('error ', error);
// 	return error;
// });
// const result = await promise;
// return result;

// async function awaitableJsmediatags(filename) {
// 	const promise = new Promise((resolve, reject) => {
// 		jsmediatags.read(filename, {
// 			onSuccess(tag) {
// 				resolve(tag);
// 			},
// 			onError(error) {
// 				reject(error);
// 			}
// 		});
// 	});
// 	const result = await promise;
// 	return result;
// }
