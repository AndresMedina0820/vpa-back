const { models } = require('../libs/sequelize_connection');
const { Sequelize } = require('sequelize');
const boom = require('@hapi/boom');
const {
  getBlobName,
  blobService,
  deleteBlob,
} = require('../controllers/blobService');
const { deleteFileTemp } = require('../controllers/deleteFilesTemp');
const containerName = 'travels';

const bookingCustomersService = require('./bookingCustomersService');
const companionsXCustomers = require('./companionsXCustomers');
const pricesService = require('./pricesService');
const customersService = require('./customersService');

const _bookingCustomersService = new bookingCustomersService();
const _companionsXCustomers = new companionsXCustomers();
const _priceService = new pricesService();
const _customersService = new customersService();

class TravelsService {
  constructor() {}

  async find({ limit = 5, offset = 0, keyword = '' }) {
    try {
      let count;
      let options = {
        where: {
          [Sequelize.Op.or]: [
            {
              name: { [Sequelize.Op.iLike]: `%${keyword}%` },
            },
          ],
        },
        include: [
          {
            model: models.Bus,
            as: 'bus',
            attributes: ['id', 'licensePlate', 'capacity'],
            include: {
              model: models.Company,
              as: 'company',
              attributes: ['id', 'name'],
            },
          },
          {
            model: models.TravelsDestination,
            as: 'destination',
            attributes: ['id', 'name'],
          },
        ],
        order: [['id', 'DESC']],
        limit: limit,
        offset: offset,
      };

      const travels = await models.Travel.findAll(options);
      count = await models.Travel.count(keyword ? options : null);

      return { travels: [...travels], count: count };
    } catch (error) {
      throw boom.clientTimeout(
        `Conexión fallida:  ${error?.original?.detail || error}`
      );
    }
  }

  async findOne(id) {
    try {
      const travel = await models.Travel.findByPk(id, {
        include: [
          {
            model: models.Bus,
            as: 'bus',
            attributes: ['id', 'licensePlate', 'capacity'],
            include: {
              model: models.Company,
              as: 'company',
              attributes: ['id', 'name'],
            },
          },
          {
            model: models.TravelsDestination,
            as: 'destination',
            attributes: ['id', 'name'],
          },
        ],
      });
      if (!travel) {
        throw boom.notFound('Viaje no encontrado');
      }
      return travel;
    } catch (error) {
      throw boom.clientTimeout(
        `Conexión fallida:  ${error?.original?.detail || error}`
      );
    }
  }

  async upload(file, id) {
    try {
      let urlImage = '';
      const name = getBlobName(file.originalname);
      const path = file.path;
      const travel = await this.findOne(id);

      if (travel?.picture) {
        deleteBlob(travel.picture, containerName);
      }

      blobService.createBlockBlobFromLocalFile(
        containerName,
        name,
        path,
        (err) => {
          if (err) {
            console.error(err);
            deleteFileTemp(path);
            throw boom.clientTimeout(
              `Error al guardar imagen: ${error?.original?.detail || error}`
            );
          }
        }
      );

      urlImage = blobService.getUrl(containerName, name);
      const data = await this.update(id, { picture: urlImage });
      if (data) {
        deleteFileTemp(path);
      }

      return urlImage;
    } catch (error) {
      throw boom.clientTimeout(
        `Error al guardar imagen: ${error?.original?.detail || error}`
      );
    }
  }

  async create(data) {
    try {
      const resp = await models.Travel.create(data);
      return resp;
    } catch (error) {
      throw boom.failedDependency(`Creación fallida:`, error);
    }
  }

  async update(id, changes) {
    try {
      const travel = await this.findOne(id);
      await travel.update(changes);
      return travel;
    } catch (error) {
      throw boom.badRequest(
        `Actualización fallida: ${error?.original?.detail || error}`
      );
    }
  }

  async delete(id) {
    try {
      const travel = await this.findOne(id);
      const { picture } = travel;

      // Delete MainCustomers and Companions
      const mainCustomers = await _bookingCustomersService.find(id);

      mainCustomers.map(async (mainCustomer) => {
        const companions = await _companionsXCustomers.findByCustomer(
          mainCustomer.customer.id
        );
        if (companions.length > 0) {
          companions.map(async (companion) => {
            await models.CompanionsXCustomers.destroy({
              where: { id: companion.id },
            });
          });
        }
        await models.BookingCustomers.destroy({
          where: { id: mainCustomer.id },
        });
      });

      // Set customers travelsId to NULL
      const customers = await models.Customer.findAll({
        where: { travelId: id },
      });

      customers.map(async (customer) => {
        await _customersService.update(customer.id, { travelId: null });
      });

      // Delete prices
      const prices = await _priceService.findByTravel(id);

      prices.map(async (price) => {
        await _priceService.delete(price.id);
      });

      // Delete Image and travel
      await deleteBlob(picture, containerName);
      await models.Travel.destroy({ where: { id: travel.id } });
      return { id };
    } catch (error) {
      console.error(error);
      throw boom.badRequest(`Error al eliminar`);
    }
  }
}

module.exports = TravelsService;
