const express = require('express');
const router = express.Router();
const pricesServices = require('../services/pricesService');
const validatorHandler = require('../middlewares/validatorHandler');
const { createPricesSchema, deletePricesSchema, getPricesSchema, updatePricesSchema } = require('../schemas/pricesSchema');

const service = new pricesServices();

router.get('/' ,async (request, response) => {
	const prices = await service.find();
	response.status(201).json(prices);
});

router.get('/:id', validatorHandler(getPricesSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		const price = await service.findOne(parseInt(id));
		response.status(201).json(price);
	} catch (error) {
		next(error);
	}
});

router.post('/', validatorHandler(createPricesSchema, 'body'), async (request, response, next) => {
	try {
		const { body } = request;
		await service.create(body);
		response.status(201).json('¡Precio creado!');
	} catch (error) {
		next(error);
	}
});

router.patch('/:id', validatorHandler(updatePricesSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		const { body } = request;
		await service.update(id, body);
		response.status(201).json('¡Precio actualizado!');
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', validatorHandler(deletePricesSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		await service.delete(id);
		response.status(201).json('¡Precio eliminado!');
	} catch (error) {
		next(error);
	}
});

module.exports = router;
