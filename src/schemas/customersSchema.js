const Joi = require("joi");

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const typeId = Joi.number().integer();
const name = Joi.string().max(255);
const lastName = Joi.string().max(255);
const dateBirth = Joi.date();
const isChild = Joi.boolean();
const email = Joi.string().email();
const phone = Joi.string();
const city = Joi.string();
const address = Joi.string();
const customerType = Joi.number().integer();

const createCustomerSchema = Joi.object({
	customerId: customerId.required(),
	typeId: typeId.required(),
	name: name.required(),
	lastName: lastName.required(),
	dateBirth: dateBirth.required(),
	isChild: isChild.required(),
	email: email.required(),
	phone: phone.required(),
	city: city.required(),
	address: address.required(),
	customerType: customerType.required(),
});

const updateCustomerSchema = Joi.object({
	id: id,
	customerId: customerId,
	typeId: typeId,
	name: name,
	lastName: lastName,
	dateBirth: dateBirth,
	isChild: isChild,
	email: email,
	phone: phone,
	city: city,
	address: address,
	customerType: customerType,
});

const deleteCustomerSchema = Joi.object({
	id: id.required(),
});

const getCustomerSchema = Joi.object({
	id: id,
	customerId: customerId,
});

module.exports = { createCustomerSchema, updateCustomerSchema, deleteCustomerSchema, getCustomerSchema };
