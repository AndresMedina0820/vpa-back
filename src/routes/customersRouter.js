const express = require('express');
const router = express.Router();
const CustomersService = require('../services/customersService');

const service = new CustomersService();

router.get('/', async (request, response) => {
	const customers = await service.find();
	response.status(201).json(customers);
});

router.get('/:id', async (request, response) => {
	const { id } = request.params;
	const customer = await service.findOne(parseInt(id));
	response.status(201).json(customer);
});

router.post('/', async (request, response) => {
	const { body } = request;
	await service.create(body);
	response.status(201).json('customer created!');
});

router.patch('/:id', async (request, response) => {
	const { id } = request.params;
	const { body } = request;
	await service.update(id, body);
	response.status(201).json('customer updated!');
});

router.delete('/:id', async (request, response) => {
	const { id } = request.params;
	await service.delete(id);
	response.status(201).json('customer deleted!');
});

module.exports = router;
