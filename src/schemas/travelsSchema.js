const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().max(255);
const destinationId = Joi.number().integer();
const departureDate = Joi.date();
const busId = Joi.number().integer();
const departureLocation = Joi.string();
const observations = Joi.string();
const picture = Joi.optional();
const isPublished = Joi.boolean();

const createTravelsSchema = Joi.object({
  name: name.required(),
  destinationId: destinationId.required(),
  departureDate: departureDate.required(),
  busId: busId.required(),
  departureLocation: departureLocation.required(),
  observations: observations,
  picture: picture,
  isPublished: isPublished,
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
  isPublished: isPublished,
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
  isPublished: isPublished,
});

const exportTravelsSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createTravelsSchema,
  updateTravelsSchema,
  deleteTravelsSchema,
  getTravelsSchema,
  exportTravelsSchema,
};
