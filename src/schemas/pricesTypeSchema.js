const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().max(50);
const seat_available = Joi.boolean().default(false);

const createPricesTypeSchema = Joi.object({
	name: name.required(),
	seat_available: seat_available
});

const updatePricesTypeSchema = Joi.object({
	id: id.required(),
	name: name,
	seat_available: seat_available
});

const deletePricesTypeSchema = Joi.object({
	id: id.required(),
});

const getPricesTypeSchema = Joi.object({
	id: id,
	name: name,
	seat_available: seat_available
});

module.exports = {
	createPricesTypeSchema,
	updatePricesTypeSchema,
	deletePricesTypeSchema,
	getPricesTypeSchema
};
