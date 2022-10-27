const Joi = require("joi");

const id = Joi.number().integer();
const travelId = Joi.number().integer();

const createBookingsSchema = Joi.object({
	travelId: travelId.required(),
});

const updateBookingsSchema = Joi.object({
	id: id.required(),
	travelId: travelId.required(),
});

const deleteBookingsSchema = Joi.object({
	id: id.required(),
	travelId: travelId,
});

const getBookingsSchema = Joi.object({
	id: id,
});

module.exports = {
	createBookingsSchema,
	updateBookingsSchema,
	deleteBookingsSchema,
	getBookingsSchema
};
