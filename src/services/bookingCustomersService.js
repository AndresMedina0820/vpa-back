const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');
const { Sequelize, Op } = require('sequelize');
class BookingCustomersService {
  constructor() {}

  async find(id) {
    try {
      const customers = await models.BookingCustomers.findAll({
        where: {
          travelId: id,
        },
        include: [
          {
            model: models.Customer,
            as: 'customer',
            attributes: [
              'id',
              'customerId',
              'typeId',
              'name',
              'lastName',
              'email',
              'phone',
              'city',
            ],
            include: [
              {
                model: models.TypeId,
                as: 'type_id',
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
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
      const customer = await models.BookingCustomers.findByPk(id);
      return customer;
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
              `(SELECT customer_id FROM booking_customers UNION ALL SELECT companion_id FROM companions_x_customers)`
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

  async create(data) {
    try {
      const resp = await models.BookingCustomers.create(data);
      return resp;
    } catch (error) {
      throw boom.failedDependency(
        `Creación fallida: ${error?.original?.detail || error}`
      );
    }
  }

  async delete(id) {
    try {
      const customer = await this.findOne(id);
      await customer.destroy();
      return { id };
    } catch (error) {
      throw boom.badRequest(
        `Eliminación fallida: ${error?.original?.detail || error}`
      );
    }
  }
}

module.exports = BookingCustomersService;
