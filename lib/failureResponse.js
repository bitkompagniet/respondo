const baseResponse = require('./baseResponse');

function failureResponse() {
	return function(req, res) {
		res.failure = function(message, code = 400) {
			if (code < 400) throw new Error('Cannot return success status code for a failure result.');
			return res.status(code).acceptedDataFormat(baseResponse(false, null, { code }, message));
		};
	};
}

module.exports = failureResponse;
