const { Sequelize } = require('sequelize');
const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');
const BookingCustomersServices = require('./bookingCustomersService');
const CompanionsXCustomersServices = require('./companionsXCustomers');

const _bookingCustomersServices = new BookingCustomersServices();
const _companionsXCustomersServices = new CompanionsXCustomersServices();

class CustomersService {
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
            {
              lastName: { [Sequelize.Op.iLike]: `%${keyword}%` },
            },
          ],
        },
        include: ['type_id', 'customer_type', 'in_booking'],
        order: [['id', 'DESC']],
        limit: limit,
        offset: offset,
      };

      const customers = await models.Customer.findAll(options);
      count = await models.Customer.count(keyword ? options : null);

      return { customers: [...customers], count: count };
    } catch (error) {
      throw boom.clientTimeout(
        `Conexión fallida:  ${error?.original?.detail || error}`
      );
    }
  }

  async findOne(id) {
    try {
      const customer = await models.Customer.findByPk(id, {
        include: ['type_id', 'customer_type', 'in_booking'],
      });
      if (!customer) {
        throw boom.notFound('Cliente no encontrado');
      }
      return customer;
    } catch (error) {
      throw boom.clientTimeout(
        `Conexión fallida:  ${error?.original?.detail || error}}`
      );
    }
  }

  async create(data) {
    try {
      const resp = await models.Customer.create(data);
      return resp;
    } catch (error) {
      throw boom.failedDependency(
        `Creación fallida: ${error?.original?.detail || error}}`
      );
    }
  }

  async update(id, changes) {
    try {
      const customer = await this.findOne(id);
      await customer.update(changes);
      return customer;
    } catch (error) {
      throw boom.badRequest(
        `Actualización fallida: ${error?.original?.detail || error}}`
      );
    }
  }

  async delete(id) {
    try {
      // const isBookingCustomer = await _bookingCustomersServices.findOne(id);
      // const isBookingCompaions = await _companionsXCustomersServices.find(id);

      const customer = await this.findOne(id);
      await customer.destroy();
      return { id };
      // if (!isBookingCustomer && !isBookingCompaions) {
      //   const customer = await this.findOne(id);
      //   await customer.destroy();
      //   return { id };
      // } else {
      //   throw boom.conflict('¡Este cliente está reservado en un viaje!');
      // }
    } catch (error) {
      throw boom.badRequest(
        `Eliminación fallida: ${error?.original?.detail || error}`
      );
    }
  }
}

module.exports = CustomersService;
