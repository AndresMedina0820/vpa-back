const { Sequelize } = require('sequelize');
const { models } = require('../libs/sequelize_connection');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');
const BookingCustomersServices = require('./bookingCustomersService');
const CompanionsXCustomersServices = require('./companionsXCustomers');

const _bookingCustomersServices = new BookingCustomersServices();
const _companionsXCustomersServices = new CompanionsXCustomersServices();

class CustomersService {
  constructor() {}

  async find() {
    try {
      const customers = await models.Customer.findAll({
        include: ['type_id', 'customer_type', 'in_booking'],
        order: [['id', 'DESC']],
      });
      return customers;
    } catch (error) {
      throw boom.clientTimeout(
        `Conexión fallida:  ${error?.original?.detail || error}`
      );
    }
  }

  async findNotBooking() {
    try {
      const customers = await models.Customer.findAll({
        where: {
          id: {
            [Op.notIn]: Sequelize.literal(
              `(SELECT customer_id FROM booking_customers)`
            ),
          },
        },
        include: ['type_id', 'customer_type', 'in_booking'],
        order: [['id', 'DESC']],
      });
      return customers;
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
      const isBookingCustomer = await _bookingCustomersServices.findOne(id);
      const isBookingCompaions = await _companionsXCustomersServices.find(id);
      if (!isBookingCustomer && !isBookingCompaions) {
        const customer = await this.findOne(id);
        await customer.destroy();
        return { id };
      } else {
        throw boom.conflict('¡Este cliente está reservado en un viaje!');
      }
    } catch (error) {
      throw boom.badRequest(
        `Eliminación fallida: ${error?.original?.detail || error}`
      );
    }
  }
}

module.exports = CustomersService;
