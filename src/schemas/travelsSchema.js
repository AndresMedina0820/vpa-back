const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().max(255);
const destinationId = Joi.number().integer();
const departureDate = Joi.date();
const busId = Joi.number().integer();
const departureLocation = Joi.string();
const observations = Joi.string();
const picture = Joi.string();

const createTravelsSchema = Joi.object({
	name: name.required(),
	destinationId: destinationId.required(),
	departureDate: departureDate.required(),
	busId: busId.required(),
	departureLocation: departureLocation.required(),
	observations: observations,
	picture: picture,
});

const updateTravelsSchema = Joi.object({
	id: id.required(),
	name: name,
	destinationId: destinationId,
	departureDate: departureDate,
	busId: busId,
	departureLocation: departureLocation,
	observations: observations,
	picture: picture,
});

const deleteTravelsSchema = Joi.object({
	id: id.required(),
});

const getTravelsSchema = Joi.object({
	id: id,
	name: name,
	destinationId: destinationId,
	departureDate: departureDate,
	busId: busId,
	departureLocation: departureLocation,
	observations: observations,
	picture: picture,
});

module.exports = {
	createTravelsSchema,
	updateTravelsSchema,
	deleteTravelsSchema,
	getTravelsSchema
};
