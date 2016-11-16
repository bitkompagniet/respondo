const baseResponse = require('./baseResponse');

function error500() {
	return function (err, req, res, next) { // eslint-disable-line no-unused-vars
		return res.status(500).json(baseResponse(false, null, { code: 500 }, err));
	};
}

module.exports = error500;
