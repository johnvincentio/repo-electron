//

const router = require('express').Router();

const Joi = require('joi');

const cors = require('cors');

const validator = require('../../config/jv-validator.js')({ Joi });

const { getMusicFoldersData, getMusicFolderMetaData, getMusicMp3 } = require('./data.controller');

const { CLIENT_SERVER } = require('../../config/config');

// prettier-ignore
const getDataSchema = Joi.object();

// prettier-ignore
const getMetaDataSchema = Joi.object({
	folderId: Joi.number().integer().required()
});

// prettier-ignore
const getMp3Schema = Joi.object({
	folderId: Joi.number().integer().required(),
	trackId: Joi.number().integer().required()
});

const joiOpts = {
	allowUnknown: false
};

const whitelist = [CLIENT_SERVER];
const corsOptions = {
	origin(origin, callback) {
		// console.log('origin ', origin);
		if (!origin || whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	}
};

// prettier-ignore
router.route('/music-folders-data')
	.all(validator.params(getDataSchema, { joi: joiOpts }))
	.get(cors(corsOptions), getMusicFoldersData);

// prettier-ignore
router.route('/music-folder-metadata/:folderId')
	.all(validator.params(getMetaDataSchema, { joi: joiOpts }))
	.get(cors(corsOptions), getMusicFolderMetaData);

// prettier-ignore
router.route('/music-mp3/:folderId/:trackId')
	.all(validator.params(getMp3Schema, { joi: joiOpts }))
	.get(cors(corsOptions), getMusicMp3);

module.exports = router;
