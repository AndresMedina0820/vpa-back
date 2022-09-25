const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().max(255);
const destinationId = Joi.number().integer();
const departure_date = Joi.date();
const busId = Joi.number().integer();
const departure_location = Joi.string();
const observations = Joi.string();
const picture = Joi.string();

const createTravelsSchema = Joi.object({
	name: name.required(),
	destinationId: destinationId.required(),
	departure_date: departure_date.required(),
	busId: busId.required(),
	departure_location: departure_location.required(),
	observations: observations,
	picture: picture
});

const updateTravelsSchema = Joi.object({
	id: id.required(),
	name: name,
	destinationId: destinationId,
	departure_date: departure_date,
	busId: busId,
	departure_location: departure_location,
	observations: observations,
	picture: picture
});

const deleteTravelsSchema = Joi.object({
	id: id.required(),
});

const getTravelsSchema = Joi.object({
	id: id,
	name: name,
	destinationId: destinationId,
	departure_date: departure_date,
	busId: busId,
	departure_location: departure_location,
	observations: observations,
	picture: picture
});

module.exports = {
	createTravelsSchema,
	updateTravelsSchema,
	deleteTravelsSchema,
	getTravelsSchema
};
