function logErrors(err, request, response, next) {
	console.log("======================Log Error: ==========================", err);
	next(err);
}

function boomErrorHandler(err, request, response, next) {
	console.log('boomErrorHandler', err);
	if (err.isBoom) {
		const { statusCode, payload } = err.output;
		response.status(statusCode).json(payload)
	}
	next(err)
}

function errorHandler(err, request, response, next) {
	console.log('errorHandler');
	response.status(500).json({
		message: err.message,
		stack: err.stack
	});
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
