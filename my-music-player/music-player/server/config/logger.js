/**
 * Use winston to implement logger
 *
 * Levels are:
 * error, warn, info, verbose, debug, silly.
 * and in that order.
 * Thus, if set level='info' => only log error, warn, info.
 *
 * @module logger
 * @requires winston
 */

const winston = require('winston');

const { LOG_LEVEL, LOG_ENV, LOG_FILE } = require('./config');

console.log(`LOG_LEVEL ${LOG_LEVEL}`);
console.log(`LOG_ENV ${LOG_ENV}`);

const consoleOptions = {
	level: LOG_LEVEL,
	handleExceptions: true,
	// json: true,
	colorize: true
};
const fileOptions = {
	level: LOG_LEVEL,
	filename: LOG_FILE,
	handleExceptions: true,
	// json: true,
	colorize: true
};

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	defaultMeta: { service: 'user-service' },
	transports: [new winston.transports.File(fileOptions)]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console(consoleOptions));
}

logger.stream = {
	write: message => {
		logger.debug(message);
	}
};

module.exports = {
	logger
};

/*
const logger = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)(consoleOptions),
    ]
});
*/
