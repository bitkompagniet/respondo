const baseResponse = require('./baseResponse');

function successResponse() {
	return function (req, res, next) {
		res.success = function(payload, code = 200) {
			if (code >= 400) throw new Error('A success response cannot set a failure status code.');
			return res.status(code).acceptedDataFormat(baseResponse(true, payload, { code }));
		};

		return next();
	};
}

module.exports = successResponse;
