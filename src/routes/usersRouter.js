const express = require('express');
const router = express.Router();
const usersServices = require('../services/usersServices');
const validatorHandler = require('../middlewares/validatorHandler');
const { createUserSchema, deleteUserSchema, getUserSchema, updateUserSchema } = require('../schemas/usersSchema');

const service = new usersServices();

router.get('/', async (request, response) => {
	const users = await service.find();
	response.status(201).json(users);
});

router.get('/:id', validatorHandler(getUserSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		const user = await service.findOne(parseInt(id));
		response.status(201).json(user);
	} catch (error) {
		next(error);
	}
});

router.post('/', validatorHandler(createUserSchema, 'body'), async (request, response, next) => {
	try {
		const { body } = request;
		await service.create(body);
		response.status(201).json('user created!');
	} catch (error) {
		next(error);
	}
});

router.patch('/:id', validatorHandler(updateUserSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		const { body } = request;
		await service.update(id, body);
		response.status(201).json('user updated!');
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', validatorHandler(deleteUserSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		await service.delete(id);
		response.status(201).json('user deleted!');
	} catch (error) {
		next(error);
	}
});

module.exports = router;
