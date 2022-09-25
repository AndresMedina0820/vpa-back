const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().max(50);

const createTravelsDestinationSchema = Joi.object({
	name: name.required(),
});

const updateTravelsDestinationSchema = Joi.object({
	id: id.required(),
	name: name,
});

const deleteTravelsDestinationSchema = Joi.object({
	id: id.required()
});

const getTravelsDestinationSchema = Joi.object({
	id: id,
	name: name,
});

module.exports = {
	createTravelsDestinationSchema,
	updateTravelsDestinationSchema,
	deleteTravelsDestinationSchema,
	getTravelsDestinationSchema
};
