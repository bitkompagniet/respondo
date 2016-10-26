const acceptedDataFormat = require('./acceptedDataFormat');
const successResponse = require('./successResponse');
const failureResponse = require('./failureResponse');

function responders() {
	return [acceptedDataFormat, successResponse, failureResponse];
}

module.exports = responders;
