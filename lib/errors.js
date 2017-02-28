
const errorMongoValidation = require('./errorMongoValidation');
const errorMongoDuplicateKey = require('./errorMongoDuplicateKey');
const errorString = require('./errorString');
const error404 = require('./error404');
const error500 = require('./error500');
const errorMongoCastError = require('./errorMongoCastError');

function errors(productionMode = false) {
	let stack = [

		errorMongoValidation(),
		errorMongoDuplicateKey(),
		errorMongoCastError(),
	];

	if (productionMode) {
		stack = [
			...stack,
			errorString(),
			error500(),
		];
	}

	stack = [
		...stack,
		error404(),
	];

	return stack;
}

module.exports = errors;
