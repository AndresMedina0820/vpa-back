const express = require('express');
const router = express.Router();
const usersServices = require('../services/usersServices');

const service = new usersServices();

router.get('/', async (request, response) => {
	const users = await service.find();
	response.status(201).json(users);
});

router.get('/:id', async (request, response) => {
	const { id } = request.params;
	const user = await service.findOne(parseInt(id));
	response.status(201).json(user);
});

router.post('/', async (request, response) => {
	const { body } = request;
	await service.create(body);
	response.status(201).json('user created!');
});

router.patch('/:id', async (request, response) => {
	const { id } = request.params;
	const { body } = request;
	await service.update(id, body);
	response.status(201).json('user updated!');
});

router.delete('/:id', async (request, response) => {
	const { id } = request.params;
	await service.delete(id);
	response.status(201).json('user deleted!');
});

module.exports = router;
