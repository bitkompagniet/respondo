const baseResponse = require('./baseResponse');
const _ = require('lodash');

module.exports = function() {
	return function (err, req, res, next) { // eslint-disable-line no-unused-vars
		if (_.isString(err)) {
			return res.status(500).json(baseResponse(false, null, { code: 500 }, { message: err }));
		}

		return next(err);
	};
};
