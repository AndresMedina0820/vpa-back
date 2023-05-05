const express = require('express');
const router = express.Router();
const CustomersService = require('../services/customersService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createCustomerSchema,
  updateCustomerSchema,
  deleteCustomerSchema,
  getCustomerSchema,
} = require('../schemas/customersSchema');
const { querySchema } = require('../schemas/querySchema');

const service = new CustomersService();

router.get('/', validatorHandler(querySchema, 'query'), async (request, response) => {
  await service.find(request.query)
  .then((resp) => {
    const customers = resp || [];
    response.status(201).json(customers);
  })
  .catch((err) => {
    console.log(err);
    response.status(500).json("Lo siento, ha habido un error en el servidor. Por favor, contacte al administrador. 😓");
  })
});

router.get(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const customers = await service.findOne(parseInt(id));
      response.status(201).json(customers);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  async (request, response, next) => {
    try {
      const { body } = request;
      const customer = await service.create(body);
      response.status(201).json([customer, '¡Cliente creado!']);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(updateCustomerSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const { body } = request;
      const customer = await service.update(id, body);
      response.status(201).json([customer, '¡Cliente actualizado!']);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(deleteCustomerSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      await service.delete(id);
      response.status(201).json('¡Cliente eliminado!');
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
