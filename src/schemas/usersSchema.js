const Joi = require("joi");

const id = Joi.number().integer();
const userId = Joi.number().integer();
const typeId = Joi.number().integer();
const name = Joi.string().max(255);
const lastName = Joi.string().max(255);
const email = Joi.string().email().max(255);
const picture = Joi.string();
const password = Joi.string().max(15);
const roleId = Joi.number().integer();

const createUserSchema = Joi.object({
	userId: userId.required(),
	typeId: typeId.required(),
	name: name.required(),
	lastName: lastName.required(),
	email: email.required(),
	picture: picture,
	password: password.required(),
	roleId: roleId.required(),
});

const updateUserSchema = Joi.object({
	id: id.required(),
	userId: userId,
	typeId: typeId,
	name: name,
	lastName: lastName,
	email: email,
	picture: picture,
	password: password,
	roleId: roleId,
});

const deleteUserSchema = Joi.object({
	id: id.required(),
});

const getUserSchema = Joi.object({
	id: id,
	userId: userId,
});

module.exports = { createUserSchema, updateUserSchema, deleteUserSchema, getUserSchema };
