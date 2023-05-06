const express = require('express');
const router = express.Router();
const pricesServices = require('../services/pricesService');
const pricesTypeServices = require('../services/pricesTypeService');
const validatorHandler = require('../middlewares/validatorHandler');
const { createPricesSchema, deletePricesSchema, getPricesSchema, updatePricesSchema } = require('../schemas/pricesSchema');

const service = new pricesServices();

router.get('/:travel_id/prices' ,async (request, response) => {
	const travelId = request.params.travel_id;
	service.findByTravel(travelId)
  .then(resp => {
    const prices = resp || [];
    response.status(201).json(prices);
  })
  .catch((err) => {
    console.log(err);
    response.status(500).json("Lo siento, ha habido un error en el servidor. Por favor, contacte al administrador. 😓");
  });
});

router.get('/:travel_id/pricesXTravel' ,async (request, response) => {
	const travelId = request.params.travel_id;
	await service.findByTravel(travelId)
  .then(resp => {
    const prices = resp || [];
    response.status(201).json(prices);
  })
  .catch((err) => {
    console.log(err);
    response.status(500).json("Lo siento, ha habido un error en el servidor. Por favor, contacte al administrador. 😓");
  });
});

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
