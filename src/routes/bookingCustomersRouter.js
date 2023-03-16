const express = require('express');
const router = express.Router();
const bookingCustomersService = require('../services/bookingCustomersService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createBookingCustomersSchema,
  deleteBookingCustomersSchema,
} = require('../schemas/bookingCustomersSchema');

const service = new bookingCustomersService();

router.get('/:id', async (request, response) => {
  const { id } = request.params;
  const customers = await service.find(id);
  response.status(201).json(customers);
});

router.get('/', async (request, response) => {
  const { id } = request.params;
  const customers = await service.findNotBooking(id);
  response.status(201).json(customers);
});

router.post(
  '/',
  validatorHandler(createBookingCustomersSchema, 'body'),
  async (request, response, next) => {
    try {
      const { body } = request;
      const customers = await service.create(body);
      response.status(201).json([customers, 'Cliente agregado correctamente']);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(deleteBookingCustomersSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      await service.delete(id);
      response.status(201).json('Cliente eliminado');
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
