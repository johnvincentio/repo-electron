/**
 * Handle routing related tasks
 *
 * @module routes
 * @requires config
 * @requires errors
 * @requires dataRouter
 */

const dataRouter = require('../api/data/data.router');

const errors = require('./errors');

module.exports = app => {
	app.use('/api/data', dataRouter);

	app.use('*', (req, res) => {
		res.status(404).json({ message: 'Not Found' });
	});

	app.use(errors);
};
