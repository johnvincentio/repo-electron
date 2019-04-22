const fs = require('fs');

let directoriesTemp = [];
let musicFile = [];

function searchMP3(directories) {
	// console.log('>>> searchMP3; directories ', directories);
	directoriesTemp = directories;

	if (directories[0] == undefined) {
		const temp = [...musicFile];
		musicFile = [];
		return temp;
	}

	// console.log('directories[0] ', directories[0]);
	const files = fs.readdirSync(directories[0]);

	files.map(item => {
		// console.log('item ', item);
		const pathname = `${directories[0]}/${item}`;
		// console.log('pathname :', pathname, ':');
		const stats = fs.statSync(pathname);

		if (stats.isDirectory()) {
			directoriesTemp.push(pathname);
		}

		if (stats.isFile()) {
			if (item.search(/\.mp3$/) > -1) {
				musicFile.push(pathname);
			}
		}
	});

	directoriesTemp.splice(0, 1);

	// console.log('<<< searchMP3; directoriesTemp ', directoriesTemp);
	return searchMP3(directoriesTemp);
}

module.exports = searchMP3;
