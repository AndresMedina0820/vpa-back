const express = require('express');
const router = express.Router();
const BusesService = require('../services/busesService');
const validatorHandler = require('../middlewares/validatorHandler');
const { createBusSchema, deleteBusSchema, getBusSchema, updateBusSchema } = require('../schemas/busesSchema');

const service = new BusesService();

router.get('/' ,async (request, response) => {
	const buses = await service.find();
	response.status(201).json(buses);
});

router.get('/:id', validatorHandler(getBusSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		const bus = await service.findOne(parseInt(id));
		response.status(201).json(bus);
	} catch (error) {
		next(error);
	}
});

router.post('/', validatorHandler(createBusSchema, 'body'), async (request, response, next) => {
	try {
		const { body } = request;
		await service.create(body);
		response.status(201).json('bus created!');
	} catch (error) {
		next(error);
	}
});

router.patch('/:id', validatorHandler(updateBusSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		const { body } = request;
		await service.update(id, body);
		response.status(201).json('bus updated!');
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', validatorHandler(deleteBusSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		await service.delete(id);
		response.status(201).json('bus deleted!');
	} catch (error) {
		next(error);
	}
});

module.exports = router;
