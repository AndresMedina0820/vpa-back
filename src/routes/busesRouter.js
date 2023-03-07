const express = require('express');
const router = express.Router();
const BusesService = require('../services/busesService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createBusSchema,
  deleteBusSchema,
  getBusSchema,
  updateBusSchema,
} = require('../schemas/busesSchema');
const { querySchema } = require('../schemas/querySchema');

const service = new BusesService();

router.get('/', validatorHandler(querySchema), async (request, response) => {
  const buses = await service.find(request.query);
  response.status(201).json(buses);
});

router.get(
  '/:id',
  validatorHandler(getBusSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const bus = await service.findOne(parseInt(id));
      response.status(201).json(bus);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createBusSchema, 'body'),
  async (request, response, next) => {
    try {
      const { body } = request;
      await service.create(body);
      response.status(201).json('¡Bus creado!');
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(updateBusSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const { body } = request;
      const bus = await service.update(id, body);
      response.status(201).json([bus, '¡Bus actualizado!']);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(deleteBusSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      await service.delete(id);
      response.status(201).json('¡Bus eliminado!');
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
