const rumor = require('rumor')('respondo:errorMongoValidation');
const baseResponse = require('./baseResponse');

module.exports = function() {
	return function(err, req, res, next) {
		if (err && err.name && err.name === 'ValidationError') {
			rumor.debug(err);
			const formatted = Object.keys(err.errors)
				.map(key => err.errors[key])
				.map(obj => ({ field: obj.path, type: obj.kind, message: obj.message }));

			return res.status(400).json(baseResponse(false, null, { code: 400 }, { type: 'validation', errors: formatted }));
		}

		return next(err);
	};
};
