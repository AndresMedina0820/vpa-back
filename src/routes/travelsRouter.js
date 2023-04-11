const express = require('express');
const router = express.Router();
const travelsServices = require('../services/travelsService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createTravelsSchema,
  deleteTravelsSchema,
  getTravelsSchema,
  updateTravelsSchema,
  exportTravelsSchema,
} = require('../schemas/travelsSchema');
const { querySchema } = require('../schemas/querySchema');
const { uploadStrategy } = require('../middlewares/uploadMedia.handler');
const excelController = require('../controllers/excelController');
const { deleteFileTemp } = require('../controllers/deleteFilesTemp');
const fs = require('fs');
const totalCustomersByTravel = require('../controllers/totalCustomersByTravel');

const service = new travelsServices();

router.get('/', validatorHandler(querySchema), async (request, response) => {
  const travels = await service.find(request.query);
  response.status(201).json(travels);
});

router.get(
  '/:id',
  validatorHandler(getTravelsSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const travel = await service.findOne(parseInt(id));
      response.status(201).json(travel);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createTravelsSchema, 'body'),
  async (request, response, next) => {
    try {
      const { body } = request;
      await service.create(body).then((res) => {
        response.status(201).json([res.id, '¡Viaje creado correctamente!']);
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/total/:id',
  validatorHandler(getTravelsSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const total = await totalCustomersByTravel.getTotalCustomersByTravel(id);
      response.status(201).json({ total: total });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/export/:id',
  validatorHandler(exportTravelsSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const xlsxFile = await excelController.generateXLSX(id, response);

      // Leer el contenido del archivo
      const fileContent = fs.readFileSync(xlsxFile, { encoding: 'base64' });

      // Enviar el contenido del archivo como una respuesta HTTP
      response.send(fileContent);
      deleteFileTemp(xlsxFile);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/upload/:id', uploadStrategy, async (request, response, next) => {
  try {
    const { file } = request;
    const { id } = request.params;
    const resp = await service.upload(file, id);
    response.status(201).json(resp);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:id',
  validatorHandler(updateTravelsSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const { body } = request;
      const travel = await service.update(id, body);
      response.status(201).json([travel, '¡Viaje actualizado!']);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(deleteTravelsSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const travelId = await service.delete(id);
      response.status(201).json(['¡Viaje eliminado!', travelId]);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
