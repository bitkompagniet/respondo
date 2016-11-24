const baseResponse = require('./baseResponse');

function error500() {
	return function (err, req, res, next) { // eslint-disable-line no-unused-vars
		return res.status(500).json(baseResponse(false, null, { code: 500 }, { message: 'Internal server error. Enable respondo debugging to see details.' }));
	};
}

module.exports = error500;
