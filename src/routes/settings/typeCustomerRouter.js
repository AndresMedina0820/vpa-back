const express = require('express');
const router = express.Router();
const typeCustomerService = require('../../services/typeCustomerService');
const validatorHandler = require('../../middlewares/validatorHandler');
const { createTypeCustomerSchema, deleteTypeCustomerSchema, getTypeCustomerSchema, updateTypeCustomerSchema } = require('../../schemas/typeCustomerSchema');

const service = new typeCustomerService();

router.get('/' ,async (request, response) => {
	const type = await service.find();
	response.status(201).json(type);
});

router.get('/:id', validatorHandler(getTypeCustomerSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		const type = await service.findOne(parseInt(id));
		response.status(201).json(type);
	} catch (error) {
		next(error);
	}
});

router.post('/', validatorHandler(createTypeCustomerSchema, 'body'), async (request, response, next) => {
	try {
		const { body } = request;
		const { dataValues } = await service.create(body);
		response.status(201).json(['¡Tipo de cliente creado!', dataValues]);
	} catch (error) {
		next(error);
	}
});

router.patch('/:id', validatorHandler(updateTypeCustomerSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		const { body } = request;
		await service.update(id, body);
		response.status(201).json('¡Tipo de cliente actualizado!');
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', validatorHandler(deleteTypeCustomerSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		await service.delete(id);
		response.status(201).json('¡Tipo de cliente eliminado!');
	} catch (error) {
		next(error);
	}
});

module.exports = router;
