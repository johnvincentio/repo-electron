/**
 * Handle middleware related tasks
 *
 * @module middlewareExpress
 * @requires express
 * @requires path
 * @requires body-parser
 * @requires logger
 */

const express = require('express');

const responseTime = require('response-time');

const path = require('path');
const bodyParser = require('body-parser');

const logRequest = (req, res, next) => {
	const logObj = {
		time: new Date().toTimeString(),
		method: req.method,
		hostname: req.hostname,
		path: req.path,
		'content type': req.get('Content-Type'),
		query: JSON.stringify(req.query),
		body: JSON.stringify(req.body)
	};
	Object.keys(logObj).forEach(key => console.log(`request ${key}: ${logObj[key]}`));
	next();
};

module.exports = app => {
	app.use(express.static(path.resolve(__dirname, '../dist'))); // for testing react prod in dev

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	app.use(responseTime());

	app.all('*', logRequest);
};
