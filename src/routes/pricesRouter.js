const express = require('express');
const router = express.Router();
const pricesServices = require('../services/pricesService');
const pricesTypeServices = require('../services/pricesTypeService');
const validatorHandler = require('../middlewares/validatorHandler');
const { createPricesSchema, deletePricesSchema, getPricesSchema, updatePricesSchema } = require('../schemas/pricesSchema');

const service = new pricesServices();

router.get('/:travel_id/prices' ,async (request, response) => {
	const travelId = request.params.travel_id;
	const prices = await service.findByTravel(travelId);
	response.status(201).json(prices);
});

// router.get('/:id', validatorHandler(getPricesSchema, 'params'), async (request, response, next) => {
// 	try {
// 		const { id } = request.params;
// 		const price = await service.findOne(parseInt(id));
// 		response.status(201).json(price);
// 	} catch (error) {
// 		next(error);
// 	}
// });

router.post('/:travel_id/prices', validatorHandler(createPricesSchema, 'body'), async (request, response, next) => {
	try {
		const { body } = request;
		await service.create(body)
		.then(async (resp) => {
			const data = await service.findOne(parseInt(resp.id));
			response.status(201).json([data,'Precio creado']);
		})
	} catch (error) {
		next(error);
	}
});

// router.patch('/:travel_id/prices/:id', validatorHandler(updatePricesSchema, 'params'), async (request, response, next) => {
// 	try {
// 		const { id } = request.params;
// 		const { body } = request;
// 		await service.update(id, body);
// 		response.status(201).json('¡Precio actualizado!');
// 	} catch (error) {
// 		next(error);
// 	}
// });

router.delete('/:travel_id/prices/:id', validatorHandler(deletePricesSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		await service.delete(id);
		response.status(201).json('Precio eliminado');
	} catch (error) {
		next(error);
	}
});

module.exports = router;
