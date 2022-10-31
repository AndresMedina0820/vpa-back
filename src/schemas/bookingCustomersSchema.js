const Joi = require("joi");

const id = Joi.number().integer();
const bookingId = Joi.number().integer();
const customerId = Joi.number().integer();

const createBookingCustomersSchema = Joi.object({
	bookingId: bookingId.required(),
	customerId: customerId.required(),
});

const deleteBookingCustomersSchema = Joi.object({
	id: id.required(),
});

module.exports = {
	createBookingCustomersSchema,
	deleteBookingCustomersSchema,
};
