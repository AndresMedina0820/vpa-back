const express = require('express');
const router = express.Router();
const BusesService = require('../services/busesService');

const service = new BusesService();

router.get('/', async (request, response) => {
	const buses = await service.find();
	response.status(201).json(buses);
});

router.get('/:id', async (request, response) => {
	const { id } = request.params;
	const bus = await service.findOne(parseInt(id));
	response.status(201).json(bus);
});

router.post('/', async (request, response) => {
	const { body } = request;
	await service.create(body);
	response.status(201).json('bus created!');
});

router.patch('/:id', async (request, response) => {
	const { id } = request.params;
	const { body } = request;
	await service.update(id, body);
	response.status(201).json('bus updated!');
});

router.delete('/:id', async (request, response) => {
	const { id } = request.params;
	await service.delete(id);
	response.status(201).json('bus deleted!');
});

module.exports = router;
