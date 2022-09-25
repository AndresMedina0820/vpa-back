const Joi = require("joi");

const id = Joi.number().integer();
const priceTypeId = Joi.number().integer();
const value = Joi.number().integer().default(0);

const createPricesSchema = Joi.object({
	priceTypeId: priceTypeId.required(),
	value: value
});

const updatePricesSchema = Joi.object({
	id: id.required(),
	priceTypeId: priceTypeId,
	value: value
});

const deletePricesSchema = Joi.object({
	id: id.required(),
});

const getPricesSchema = Joi.object({
	id: id,
	priceTypeId: priceTypeId,
	value: value
});

module.exports = {
	createPricesSchema,
	updatePricesSchema,
	deletePricesSchema,
	getPricesSchema
};
