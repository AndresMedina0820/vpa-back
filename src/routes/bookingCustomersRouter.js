const express = require('express');
const router = express.Router();
const bookingCustomersService = require('../services/bookingCustomersService');
const validatorHandler = require('../middlewares/validatorHandler');
const { createBookingCustomersSchema, deleteBookingCustomersSchema } = require('../schemas/bookingCustomersSchema');

const service = new bookingCustomersService();

router.get('/' ,async (request, response) => {
	const customers = await service.find();
	response.status(201).json(customers);
});

router.post('/', validatorHandler(createBookingCustomersSchema, 'body'), async (request, response, next) => {
	try {
		const { body } = request;
		await service.create(body)
		.then((res) => {
			response.status(201).json([res.id, 'Cliente agregado correctamente']);
		});
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', validatorHandler(deleteBookingCustomersSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		await service.delete(id);
		response.status(201).json('Cliente eliminado');
	} catch (error) {
		next(error);
	}
});

module.exports = router;
