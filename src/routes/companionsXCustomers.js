const express = require('express');
const router = express.Router();
const CompanionsXCustomersService = require('../services/companionsXCustomers');
const validatorHandler = require('../middlewares/validatorHandler');
const { createCompanionIdSchema, deleteCompanionIdSchema, getCompanionIdSchema } = require('../schemas/companionsXCustomers');

const service = new CompanionsXCustomersService();

router.get('/:customerId', validatorHandler(getCompanionIdSchema, 'params'), async (request, response, next) => {
	try {
		const { customerId } = request.params;
		const companions = await service.findByCustomer(parseInt(customerId, 10));
		response.status(201).json(companions);
	} catch (error) {
		next(error);
	}
});

router.post('/', validatorHandler(createCompanionIdSchema, 'body'), async (request, response, next) => {
	try {
    const { body } = request;
		await service.create(body);
		response.status(201).json('Acompañante creado');
	} catch (error) {
		next(error);
	}
});

router.delete('/:companionId', validatorHandler(deleteCompanionIdSchema, 'params'), async (request, response, next) => {
	try {
		const { companionId } = request.params;
		const id = await service.delete(companionId);
		response.status(201).json(['Acompañante eliminado', id]);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
