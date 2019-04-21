const fs = require('fs');

let directoriesTemp = [];
let musicFile = [];

function searchMP3(directories) {
	directoriesTemp = directories;

	if (directories[0] == undefined) {
		const temp = [...musicFile];
		musicFile = [];
		return temp;
	}

	const files = fs.readdirSync(directories[0]);

	files.map(item => {
		const stats = fs.statSync(`${directories[0]  }\\${  item}`);

		if (stats.isDirectory()) {
			directoriesTemp.push(`${directories[0]  }\\${  item}`);
		}

		if (stats.isFile()) {
			if (item.search(/\.mp3$/) > -1) {
				musicFile.push(`${directories[0]  }\\${  item}`);
			}
		}
	});

	directoriesTemp.splice(0, 1);

	return searchMP3(directoriesTemp);
}

module.exports = searchMP3;
