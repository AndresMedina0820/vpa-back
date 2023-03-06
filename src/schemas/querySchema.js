const Joi = require("joi");

const limit = Joi.number().integer();
const offset = Joi.number().integer();
const keyword = Joi.string().allow(null || '');

const querySchema = Joi.object({
  limit,
  offset,
  keyword,
});

module.exports = { querySchema }
