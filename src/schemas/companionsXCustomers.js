const Joi = require('joi');

const customerId = Joi.number().integer();
const companionId = Joi.number().integer();
const travelId = Joi.number().integer();
const priceId = Joi.number().integer();
const isPaid = Joi.boolean().default(false);
const outstandingBalance = Joi.number().integer().default(0);

const getCompanionIdSchema = Joi.object({
  customerId: customerId,
});

const createCompanionIdSchema = Joi.object({
  customerId: customerId.required(),
  companionId: companionId.required(),
  travelId: travelId.required(),
  priceId: priceId,
  isPaid: isPaid,
  outstandingBalance: outstandingBalance,
});

const updateCompanionIdSchema = Joi.object({
  companionId: companionId.required(),
  travelId: travelId.required(),
  customerId: customerId,
  priceId: priceId,
  isPaid: isPaid,
  outstandingBalance: outstandingBalance,
});

const deleteCompanionIdSchema = Joi.object({
  companionId: companionId.required(),
});

module.exports = {
  getCompanionIdSchema,
  createCompanionIdSchema,
  updateCompanionIdSchema,
  deleteCompanionIdSchema,
};
