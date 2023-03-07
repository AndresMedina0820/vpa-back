const { models } = require('../libs/sequelize_connection');
const { Sequelize } = require('sequelize');
const boom = require('@hapi/boom');

class BusesService {
  constructor() {}

  async find({ limit = 5, offset = 0, keyword = '' }) {
    try {
      let count;
      let options = {
        where: {
          ['licensePlate']: { [Sequelize.Op.iLike]: `%${keyword}%` },
        },
        include: ['company'],
        order: [['id', 'DESC']],
        limit: limit,
        offset: offset,
      };

      const buses = await models.Bus.findAll(options);
      count = await models.Bus.count(keyword ? options : null);

      return { buses: [...buses], count: count };
    } catch (error) {
      throw boom.clientTimeout(
        `Conexión fallida:  ${error?.original?.detail || error}`
      );
    }
  }

  async findOne(id) {
    try {
      const bus = await models.Bus.findByPk(id, {
        include: ['company'],
      });
      if (!bus) {
        throw boom.notFound('Bus no encontrado');
      }
      return bus;
    } catch (error) {
      throw boom.clientTimeout(
        `Conexión fallida:  ${error?.original?.detail || error}`
      );
    }
  }

  async create(data) {
    try {
      const response = await models.Bus.create(data);
      return response;
    } catch (error) {
      throw boom.failedDependency(
        `Creación fallida: ${error?.original?.detail || error}`
      );
    }
  }

  async update(id, changes) {
    try {
      const bus = await this.findOne(id);
      await bus.update(changes);
      return bus;
    } catch (error) {
      throw boom.badRequest(
        `Actualización fallida:  ${error?.original?.detail || error}`
      );
    }
  }

  async delete(id) {
    try {
      const bus = await this.findOne(id);
      await bus.destroy();
      return { id };
    } catch (error) {
      throw boom.badRequest(
        `Eliminación fallida:  ${error?.original?.detail || error}`
      );
    }
  }
}

module.exports = BusesService;
