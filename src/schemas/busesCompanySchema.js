const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().max(50);

const createBusesCompanySchema = Joi.object({
	name: name.required(),
});

const updateBusesCompanySchema = Joi.object({
	id: id.required(),
	name: name,
});

const deleteBusesCompanySchema = Joi.object({
	id: id.required()
});

const getBusesCompanySchema = Joi.object({
	id: id,
	name: name,
});

module.exports = {
	createBusesCompanySchema,
	updateBusesCompanySchema,
	deleteBusesCompanySchema,
	getBusesCompanySchema
};
