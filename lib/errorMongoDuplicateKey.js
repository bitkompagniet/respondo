const rumor = require('rumor');
const baseResponse = require('./baseResponse');

module.exports = function() {
	return function(err, req, res, next) { // eslint-disable-line
		if (err && err.name && err.name === 'MongoError' && err.code === 11000) {
			rumor.warn(Object.keys(err));
			return res.status(400).json(baseResponse(false, null, { code: 400 }, { type: 'duplicate', errors: 'Duplicate key rejected.' }));
		}

		return next(err);
	};
};
