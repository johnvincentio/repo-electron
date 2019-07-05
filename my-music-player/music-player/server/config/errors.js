/**
 * Handle http errors
 *
 * @module errors
 * @requires logger
 */

const { logger } = require('./logger');

module.exports = (err, req, res, next) => {
	logger.info(`err.name ${err.name}`);
	if (err.name === 'UnauthorizedError') {
		logger.info(`ERROR; 401, in errors.js, unauthorized; url ${req.url}`);
		if (req.url === '/dashboard') {
			return res.redirect('/login');
		}
		res.status(401).json({ unauthorized: 'You need a token to access that resource.' });
	} else if (err.code === 400) {
		logger.info('ERROR; 400, in errors.js, 400 error');
		res.status(400).json({ message: err.message });
	} else {
		logger.info(`ERROR; 500, in errors.js; err ${err}`);
		res.status(500).json({ message: 'Server Error' });
	}
};
