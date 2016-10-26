function baseResponse(success, payload = null, extras = {}, error = null) {
	const result = {
		success: !!success,
	};

	Object.assign(result, extras);

	result.result = payload;
	if (error) result.error = error;

	return result;
}

module.exports = baseResponse;
