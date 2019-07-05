/**
 * Utility methods to handle validation of http requests.
 * @module JVValidator
 * @requires joi
 */

function buildErrorString(err) {
	let ret = '';
	const details = err.error.details;
	for (let i = 0; i < details.length; i++) {
		ret += ` ${details[i].message}`;
	}
	return ret;
}

module.exports = function jvfunc(cfg) {
	const Joi = cfg.Joi;
	const instance = {};
	instance.body = function(schema, opts) {
		return function jvfunc2(req, res, next) {
			const ret = Joi.validate(req.body, schema, opts.joi);
			if (!ret.error) {
				req.body = ret.value;
				next();
			} else {
				const msg = buildErrorString(ret);
				const error = new Error(msg);
				error.code = 400;
				return next(error);
			}
		};
	};
	instance.params = function(schema, opts) {
		return function jvfunc2(req, res, next) {
			const ret = Joi.validate(req.params, schema, opts.joi);
			if (!ret.error) {
				req.params = ret.value;
				next();
			} else {
				const msg = buildErrorString(ret);
				const error = new Error(msg);
				error.code = 400;
				return next(error);
			}
		};
	};
	return instance;
};

/*
'use strict';

// These represent the incoming data containers that we might need to validate
const containers = {
  query: {
    storageProperty: 'originalQuery',
    joi: {
      convert: true,
      allowUnknown: false,
      abortEarly: false
    }
  },
  body: {
    storageProperty: 'originalBody',
    joi: {
      convert: true,
      allowUnknown: false,
      abortEarly: false
    }
  },
  headers: {
    storageProperty: 'originalHeaders',
    joi: {
      convert: true,
      allowUnknown: true,
      stripUnknown: false,
      abortEarly: false
    }
  },
  params: {
    storageProperty: 'originalParams',
    joi: {
      convert: true,
      allowUnknown: false,
      abortEarly: false
    }
  }
};

function buildErrorString (err, container) {
  let ret = `Error validating request ${container}.`;
  let details = err.error.details;

  for (let i = 0; i < details.length; i++) {
    ret += ` ${details[i].message}.`;
  }

  return ret;
}

module.exports = function generateJoiMiddlewareInstance (cfg) {
  cfg = cfg || {}; // default to an empty config

  const Joi = cfg.joi || require('joi');

  // We'll return this instance of the middleware
  const instance = {};

  Object.keys(containers).forEach((type) => {
    // e.g the "body" or "query" from above
    const container = containers[type];

    instance[type] = function (schema, opts) {
      opts = opts || {}; // like config, default to empty object

      return function exporessJoiValidator (req, res, next) {
        const ret = Joi.validate(req[type], schema, opts.joi || container.joi);

        if (!ret.error) {
          req[container.storageProperty] = req[type];
          req[type] = ret.value;
          next();
        } else if (opts.passError || cfg.passError) {
          ret.type = type;
          next(ret);
        } else {
          res
            .status(opts.statusCode || cfg.statusCode || 400)
            .end(buildErrorString(ret, type));
        }
      };
    };
  });

  return instance;
};
*/
