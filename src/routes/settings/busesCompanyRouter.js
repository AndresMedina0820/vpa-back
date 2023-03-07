const express = require('express');
const router = express.Router();
const busesCompanyService = require('../../services/busesCompanyService');
const validatorHandler = require('../../middlewares/validatorHandler');
const { createBusesCompanySchema, deleteBusesCompanySchema, getBusesCompanySchema, updateBusesCompanySchema } = require('../../schemas/busesCompanySchema');

const service = new busesCompanyService();

router.get('/' ,async (request, response) => {
	const companies = await service.find();
	response.status(201).json(companies);
});

router.get('/:id', validatorHandler(getBusesCompanySchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		const company = await service.findOne(parseInt(id));
		response.status(201).json(company);
	} catch (error) {
		next(error);
	}
});

router.post('/', validatorHandler(createBusesCompanySchema, 'body'), async (request, response, next) => {
	try {
		const { body } = request;
		const company = await service.create(body);
		response.status(201).json(['¡Compañia creada!', company]);
	} catch (error) {
		next(error);
	}
});

router.patch('/:id', validatorHandler(updateBusesCompanySchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		const { body } = request;
		await service.update(id, body);
		response.status(201).json('¡Compañia actualizada!');
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', validatorHandler(deleteBusesCompanySchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		await service.delete(id);
		response.status(201).json('¡Compañia eliminada!');
	} catch (error) {
		next(error);
	}
});

module.exports = router;
