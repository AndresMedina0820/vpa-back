const Joi = require("joi");

const customerId = Joi.number().integer();
const companionId = Joi.number().integer();

const getCompanionIdSchema = Joi.object({
	customerId: customerId,
});

const createCompanionIdSchema = Joi.object({
  customerId: customerId.required(),
	companionId: companionId.required(),
});

const deleteCompanionIdSchema = Joi.object({
	companionId: companionId.required(),
});

module.exports = {
  getCompanionIdSchema,
	createCompanionIdSchema,
	deleteCompanionIdSchema,
};
