const express = require('express');
const router = express.Router();
const usersService = require('../services/usersService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} = require('../schemas/usersSchema');
const { querySchema } = require('../schemas/querySchema');

const service = new usersService();

router.get('/', validatorHandler(querySchema), async (request, response) => {
  const users = await service.find(request.query);
  response.status(201).json(users);
});

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const users = await service.findOne(parseInt(id));
      response.status(201).json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (request, response, next) => {
    try {
      const { body } = request;
      const user = await service.create(body);
      response.status(201).json([user, '¡Usuario creado!']);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(updateUserSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const { body } = request;
      const user = await service.update(id, body);
      response.status(201).json([user, '¡Usuario actualizado!']);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(deleteUserSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      await service.delete(id);
      response.status(201).json('¡Usuario eliminado!');
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
