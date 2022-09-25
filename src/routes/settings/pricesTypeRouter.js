const express = require('express');
const router = express.Router();
const pricesTypeService = require('../../services/pricesTypeService');
const validatorHandler = require('../../middlewares/validatorHandler');
const { createPricesTypeSchema, deletePricesTypeSchema, getPricesTypeSchema, updatePricesTypeSchema } = require('../../schemas/pricesTypeSchema');

const service = new pricesTypeService();

router.get('/' ,async (request, response) => {
	const prices_type = await service.find();
	response.status(201).json(prices_type);
});

router.get('/:id', validatorHandler(getPricesTypeSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		const price_type = await service.findOne(parseInt(id));
		response.status(201).json(price_type);
	} catch (error) {
		next(error);
	}
});

router.post('/', validatorHandler(createPricesTypeSchema, 'body'), async (request, response, next) => {
	try {
		const { body } = request;
		await service.create(body);
		response.status(201).json('Prices type created!');
	} catch (error) {
		next(error);
	}
});

router.patch('/:id', validatorHandler(updatePricesTypeSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		const { body } = request;
		await service.update(id, body);
		response.status(201).json('Prices type updated!');
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', validatorHandler(deletePricesTypeSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		await service.delete(id);
		response.status(201).json('Prices type deleted!');
	} catch (error) {
		next(error);
	}
});

module.exports = router;
