const express = require('express');
const router = express.Router();
const bookingServices = require('../services/bookingsService');
const validatorHandler = require('../middlewares/validatorHandler');
const { createBookingsSchema, deleteBookingsSchema, getBookingsSchema, updateBookingsSchema } = require('../schemas/bookingsSchema');

const service = new bookingServices();

router.get('/' ,async (request, response) => {
	const booking = await service.find();
	response.status(201).json(booking);
});

router.get('/:id', validatorHandler(getBookingsSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		const booking = await service.findOne(parseInt(id));
		response.status(201).json(booking);
	} catch (error) {
		next(error);
	}
});

router.get('/travels/:travel_id/' ,async (request, response) => {
	const travelId = request.params.travel_id;
	const prices = await service.findByTravel(travelId);
	response.status(201).json(prices);
});

router.post('/', validatorHandler(createBookingsSchema, 'body'), async (request, response, next) => {
	try {
		const { body } = request;
		await service.create(body)
		.then((res) => {
			response.status(201).json([res.id, 'Reserva creada correctamente']);
		});
	} catch (error) {
		next(error);
	}
});

router.patch('/:id', validatorHandler(updateBookingsSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		const { body } = request;
		await service.update(id, body)
		.then((res) => {
			response.status(201).json([res.id,'Reserva actualizada']);
		});
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', validatorHandler(deleteBookingsSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		await service.delete(id);
		response.status(201).json('Reserva eliminada');
	} catch (error) {
		next(error);
	}
});

module.exports = router;
