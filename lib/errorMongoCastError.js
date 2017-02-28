const rumor = require('rumor')('respondo:errorMongoCastError');
const baseResponse = require('./baseResponse');

module.exports = function() {
	return function(err, req, res, next) {
		if (err && err.name && err.name === 'CastError') {
			const formatted = `${err.stringValue} is not a valid id at path ${err.path}`;
			rumor.debug(formatted);
			return res.status(400).json(baseResponse(false, null, { code: 400 }, { type: 'cast', errors: formatted }));
		}
		return next(err);
	};
};
