//
require('dotenv').config();

exports.LOG_ENV = process.env.LOG_ENV || 'prod'; // 'dev', 'prod', 'heroku'

exports.LOG_LEVEL = process.env.LOG_LEVEL || 'info';

exports.LOG_FILE = process.env.LOG_FILE || 'error.log';

exports.CLIENT_SERVER = process.env.CLIENT_SERVER || `http://localhost:8020`;

exports.PORT = process.env.PORT || 9020;

exports.MUSIC_ROOT_DIRECTORY =
	process.env.MUSIC_ROOT_DIRECTORY || `/Users/jv/Desktop/MyDocs/JV_Music`;

// `/Users/jv/Desktop/MyDocs/JV_MUSIC/Other`;
