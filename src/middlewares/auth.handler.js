const boom = require("@hapi/boom");
const { config } = require("../config/config")

function checkApiKey(request, response, next) {
	const apiKey = request.headers['api'];
	if (apiKey === config.apiKey) {
		next();
	} else {
		next(boom.unauthorized());
	}
}

module.exports = { checkApiKey };
