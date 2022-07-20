const boom = require("@hapi/boom");

function validatorHandler(schema, property) {
	return (request, response, next) => {
		console.log("validatorHandler", request[property]);
		const data = request[property];
		const { error } = schema.validate(data, { abortEarly: false });
		if (error) {
			console.log("NEXT ERROR", error)
			next(boom.badRequest(error));
		}
		next();
	}
}

module.exports = validatorHandler;
