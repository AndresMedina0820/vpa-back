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
  let customers = [];
  if (request?.query?.has_booking) {
    customers = await service.findNotBooking();
  } else {
    customers = await service.find(request.query);
  }
  response.status(201).json(customers);
});

router.get(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const customer = await service.findOne(parseInt(id));
      response.status(201).json(customer);
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
