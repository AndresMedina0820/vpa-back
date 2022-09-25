const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().max(255);

const createTypeCustomerSchema = Joi.object({
	name: name.required(),
});

const updateTypeCustomerSchema = Joi.object({
	id: id.required(),
	name: name,
});

const deleteTypeCustomerSchema = Joi.object({
	id: id.required(),
});

const getTypeCustomerSchema = Joi.object({
	id: id,
	name: name,
});

module.exports = {
	createTypeCustomerSchema,
	updateTypeCustomerSchema,
	deleteTypeCustomerSchema,
	getTypeCustomerSchema
};
