const Joi = require("joi");

const id = Joi.number().integer();
const travel_id = Joi.number().integer();
const priceTypeId = Joi.number().integer();
const travelId = Joi.number().integer();
const value = Joi.number().integer().default(0);

const createPricesSchema = Joi.object({
	priceTypeId: priceTypeId.required(),
	travelId: travelId.required(),
	value: value
});

const updatePricesSchema = Joi.object({
	id: id.required(),
	priceTypeId: priceTypeId,
	travelId: travelId,
	value: value
});

const deletePricesSchema = Joi.object({
	id: id.required(),
	travel_id: travel_id,
});

const getPricesSchema = Joi.object({
	id: id,
	priceTypeId: priceTypeId,
	travelId: travelId,
	value: value
});

module.exports = {
	createPricesSchema,
	updatePricesSchema,
	deletePricesSchema,
	getPricesSchema
};
