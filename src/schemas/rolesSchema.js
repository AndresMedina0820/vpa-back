const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().max(255);

const createRoleSchema = Joi.object({
	name: name.required(),
});

const updateRoleSchema = Joi.object({
	id: id.required(),
	name: name,
});

const deleteRoleSchema = Joi.object({
	id: id.required(),
});

const getRoleSchema = Joi.object({
	id: id,
	name: name,
});

module.exports = {
	createRoleSchema,
	updateRoleSchema,
	deleteRoleSchema,
	getRoleSchema
};
