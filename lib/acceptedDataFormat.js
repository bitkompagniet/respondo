const baseResponse = require('./baseResponse');
const js2xmlparser = require('js2xmlparser');

function acceptedDataFormat() {
	return function(req, res, next) {
		res.acceptedDataFormat = function(payload) {

			// Disabled until we have a way to bypass it.
			return res.json(payload);

			const preferred = req.accepts('json', 'xml');

			if (!preferred) return res.status(406).json(baseResponse(false, null, { code: 406 }, 'The requested format could not be accepted.'));

			if (preferred === 'xml') {
				return res.send(js2xmlparser.parse('result', payload));
			}

			return res.json(payload);
		};

		return next();
	};
}

module.exports = acceptedDataFormat;
