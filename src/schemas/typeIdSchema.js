const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().max(255);

const createTypeIdSchema = Joi.object({
	name: name.required(),
});

const updateTypeIdSchema = Joi.object({
	id: id.required(),
	name: name,
});

const deleteTypeIdSchema = Joi.object({
	id: id.required(),
});

const getTypeIdSchema = Joi.object({
	id: id,
	name: name,
});

module.exports = {
	createTypeIdSchema,
	updateTypeIdSchema,
	deleteTypeIdSchema,
	getTypeIdSchema
};
