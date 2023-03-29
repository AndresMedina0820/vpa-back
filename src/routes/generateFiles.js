const express = require('express');
const router = express.Router();
const travelsServices = require('../services/travelsService');
const validatorHandler = require('../middlewares/validatorHandler');
const { createTravelsSchema, deleteTravelsSchema, getTravelsSchema, updateTravelsSchema } = require('../schemas/travelsSchema');
const PricesService = require("../services/pricesService");

const service = new travelsServices();

router.get('/:id', validatorHandler(getTravelsSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		const travel = await service.findOne(parseInt(id));
		response.status(201).json(travel);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
