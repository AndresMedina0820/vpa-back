const express = require('express');
const router = express.Router();
const TypeIdService = require('../../services/typeIdService');
const validatorHandler = require('../../middlewares/validatorHandler');
const { createTypeIdSchema, deleteTypeIdSchema, getTypeIdSchema, updateTypeIdSchema } = require('../../schemas/typeIdSchema');

const service = new TypeIdService();

router.get('/' ,async (request, response) => {
	const types = await service.find();
	response.status(201).json(types);
});

router.get('/:id', validatorHandler(getTypeIdSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		const type = await service.findOne(parseInt(id));
		response.status(201).json(type);
	} catch (error) {
		next(error);
	}
});

router.post('/', validatorHandler(createTypeIdSchema, 'body'), async (request, response, next) => {
	try {
		const { body } = request;
		await service.create(body);
		response.status(201).json('Tipo de Id creado!');
	} catch (error) {
		next(error);
	}
});

router.patch('/:id', validatorHandler(updateTypeIdSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		const { body } = request;
		await service.update(id, body);
		response.status(201).json('Tipo de Id actulizado!');
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', validatorHandler(deleteTypeIdSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		await service.delete(id);
		response.status(201).json('Tipo de Id eliminado!');
	} catch (error) {
		next(error);
	}
});

module.exports = router;
