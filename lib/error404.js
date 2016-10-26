const baseResponse = require('./baseResponse');

function error404(message = 'The endpoint could not be found.') {
	return function (req, res) {
		return res.status(404).json(baseResponse(false, null, { code: 404 }, message));
	};
}

module.exports = error404;
