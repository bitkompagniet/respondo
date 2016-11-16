const error404 = require('./error404');
const error500 = require('./error500');

function errors() {
	return [
		error404(),
		error500(),
	];
}

module.exports = errors;
