const express = require('express');
const router = express.Router();
const travelsServices = require('../services/travelsService');
const validatorHandler = require('../middlewares/validatorHandler');
const { createTravelsSchema, deleteTravelsSchema, getTravelsSchema, updateTravelsSchema } = require('../schemas/travelsSchema');

const service = new travelsServices();

router.get('/' ,async (request, response) => {
	const travels = await service.find();
	response.status(201).json(travels);
});

router.get('/:id', validatorHandler(getTravelsSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		const travel = await service.findOne(parseInt(id));
		response.status(201).json(travel);
	} catch (error) {
		next(error);
	}
});

router.post('/', validatorHandler(createTravelsSchema, 'body'), async (request, response, next) => {
	try {
		const { body } = request;
		await service.create(body);
		response.status(201).json('Travel created!');
	} catch (error) {
		next(error);
	}
});

router.patch('/:id', validatorHandler(updateTravelsSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		const { body } = request;
		await service.update(id, body);
		response.status(201).json('Travel updated!');
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', validatorHandler(deleteTravelsSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		await service.delete(id);
		response.status(201).json('Travel deleted!');
	} catch (error) {
		next(error);
	}
});

module.exports = router;
