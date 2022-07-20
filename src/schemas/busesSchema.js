const Joi = require("joi");

const id = Joi.number().integer();
const licensePlate = Joi.string().max(15);
const capacity = Joi.number().integer();
const companyId = Joi.number().integer();

const createBusSchema = Joi.object({
	licensePlate: licensePlate.required(),
	capacity: capacity.required(),
	companyId: companyId.required(),
});

const updateBusSchema = Joi.object({
	id: id.required(),
	licensePlate: licensePlate,
	capacity: capacity,
	companyId: companyId,
});

const deleteBusSchema = Joi.object({
	id: id.required()
});

const getBusSchema = Joi.object({
	id: id,
	licensePlate: licensePlate,
});

module.exports = { createBusSchema, updateBusSchema, deleteBusSchema, getBusSchema };
