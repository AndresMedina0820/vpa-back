function logErrors(err, request, response, next) {
	console.error("======================Log Error: ==========================", err);
	next(err);
}

function errorHandler(err, request, response, next) {
	console.log('errorHandler');
	response.status(500).json({
		message: err.message,
		stack: err.stack
	});
}

function boomErrorHandler(err, request, response, next) {
	console.log('boomErrorHandler');
	if (err.isBoom) {
		const { statusCode, payload } = err.output;
		response.status(statusCode).json(payload)
	}
	next(err)
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
