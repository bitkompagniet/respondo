const jsonwebtoken = require('jsonwebtoken');
const rumor = require('rumor')('respondo:authorization');

module.exports = function(secret, { header = 'Authorization' } = {}) {
	rumor.debug(`Adding authorization middleware, checking the header ${header} with secret ${secret}`);

	return function(req, res, next) {
		req.identity = { user: null, authenticated: false };
		const token = req.header(header);

		if (!token) {
			rumor.debug('No Authorization header set.');
			next();
			return;
		}

		jsonwebtoken.verify(token, secret, function(err, decoded) {

			if (err) {
				rumor.error(`Suppressed error during decode: ${err}.`);
				next();
				return;
			}

			req.identity.user = decoded;
			req.identity.authenticated = true;

			rumor.debug('Identity added to req:');
			rumor.debug(req.identity);

			next();
		});
	};
};
