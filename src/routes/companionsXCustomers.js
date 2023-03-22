const express = require('express');
const router = express.Router();
const CompanionsXCustomersService = require('../services/companionsXCustomers');
const validatorHandler = require('../middlewares/validatorHandler');
const { createCompanionIdSchema, deleteCompanionIdSchema, getCompanionIdSchema } = require('../schemas/companionsXCustomers');

const service = new CompanionsXCustomersService();

router.get('/:customerId', validatorHandler(getCompanionIdSchema, 'params'), async (request, response, next) => {
	try {
		const { customerId } = request.params;
		const companions = await service.find(parseInt(customerId, 10));
		response.status(201).json(companions);
	} catch (error) {
		next(error);
	}
});

router.post('/', validatorHandler(createCompanionIdSchema, 'body'), async (request, response, next) => {
	try {
    const { body } = request;
		await service.create(body);
		response.status(201).json('¡Acompañante creado!');
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', validatorHandler(deleteCompanionIdSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		await service.delete(id);
		response.status(201).json('¡Acompañante eliminado!');
	} catch (error) {
		next(error);
	}
});

module.exports = router;
