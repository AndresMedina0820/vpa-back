const Joi = require("joi");

const id = Joi.number().integer();
const travelId = Joi.number().integer();
const customerId = Joi.number().integer();
const priceId = Joi.number().integer();
const isPaid = Joi.boolean().default(false);
const outstandingBalance = Joi.number().integer().default(0);

const createBookingCustomersSchema = Joi.object({
	travelId: travelId.required(),
	customerId: customerId.required(),
  priceId: priceId,
  isPaid: isPaid,
  outstandingBalance: outstandingBalance,
});

const updatePriceByBookingCustomersSchema = Joi.object({
  priceId: priceId,
  isPaid: isPaid,
  outstandingBalance: outstandingBalance,
});

const deleteBookingCustomersSchema = Joi.object({
	id: id.required(),
});

module.exports = {
	createBookingCustomersSchema,
  updatePriceByBookingCustomersSchema,
	deleteBookingCustomersSchema,
};
