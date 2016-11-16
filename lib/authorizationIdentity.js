const jsonwebtoken = require('jsonwebtoken');
const rumor = require('rumor')('respondo:authorization');

module.exports = function(secret, { header = 'Authorization' } = {}) {
	return function(req, res, next) {
		req.identity = { user: null, authenticated: false };
		const token = req.header(header);

		if (!token) {
			rumor.debug('No Authorization header set.');
			req.identity = null;
			return next();
		}

		jsonwebtoken.verify(token, secret, function(err, decoded) {
			if (err) {
				rumor.debug(`An error happened while trying to decode the token: ${err}.`);
				return next(err);
			}

			req.identity.user = decoded;
			req.identity.authenticated = true;

			rumor.debug('Identity added to req:');
			rumor.debug(req.identity);

			return next();
		});
	};
};
