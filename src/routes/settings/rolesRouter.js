const express = require('express');
const router = express.Router();
const rolesService = require('../../services/rolesService');
const validatorHandler = require('../../middlewares/validatorHandler');
const { createRoleSchema, deleteRoleSchema, getRoleSchema, updateRoleSchema } = require('../../schemas/rolesSchema');

const service = new rolesService();

router.get('/' ,async (request, response) => {
	const roles = await service.find();
	response.status(201).json(roles);
});

router.get('/:id', validatorHandler(getRoleSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		const role = await service.findOne(parseInt(id));
		response.status(201).json(role);
	} catch (error) {
		next(error);
	}
});

router.post('/', validatorHandler(createRoleSchema, 'body'), async (request, response, next) => {
	try {
		const { body } = request;
		const { dataValues } = await service.create(body);
		response.status(201).json(['Rol creado!', dataValues]);
	} catch (error) {
		next(error);
	}
});

router.patch('/:id', validatorHandler(updateRoleSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		const { body } = request;
		await service.update(id, body);
		response.status(201).json('Rol actulizado!');
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', validatorHandler(deleteRoleSchema, 'params'), async (request, response, next) => {
	try {
		const { id } = request.params;
		await service.delete(id);
		response.status(201).json('Rol eliminado!');
	} catch (error) {
		next(error);
	}
});

module.exports = router;
