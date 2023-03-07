const express = require('express');
const router = express.Router();
const travelsDestinationService = require('../../services/travelsDestinationService');
const validatorHandler = require('../../middlewares/validatorHandler');
const { createTravelsDestinationSchema, deleteTravelsDestinationSchema, getTravelsDestinationSchema, updateTravelsDestinationSchema } = require('../../schemas/travelsDestinationSchema');

const service = new travelsDestinationService();

router.get('/' ,async (request, response) => {
	const destinations = await service.find();
	response.status(201).json(destinations);
});

router.get('/:id', validatorHandler(getTravelsDestinationSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		const destination = await service.findOne(parseInt(id));
		response.status(201).json(destination);
	} catch (error) {
		next(error);
	}
});

router.post('/', validatorHandler(createTravelsDestinationSchema, 'body'), async (request, response, next) => {
	try {
		const { body } = request;
		const destination = await service.create(body);
		response.status(201).json(['¡Destino creado!', destination]);
	} catch (error) {
		next(error);
	}
});

router.patch('/:id', validatorHandler(updateTravelsDestinationSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		const { body } = request;
		await service.update(id, body);
		response.status(201).json('¡Destino actualizado!');
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', validatorHandler(deleteTravelsDestinationSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		await service.delete(id);
		response.status(201).json('¡Destino eliminado!');
	} catch (error) {
		next(error);
	}
});

module.exports = router;
