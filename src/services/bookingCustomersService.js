const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');
const { Sequelize, Op } = require('sequelize');
const CustomersService = require('./customersService');
const _customersService = new CustomersService();
class BookingCustomersService {
  constructor() {}

  async find(id) {
    try {
      const options = {
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
              'dateBirth',
              'isChild',
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
      };

      const customers = await models.BookingCustomers.findAll(options);
      return customers;
    } catch (error) {
      throw boom.clientTimeout(
        `Conexión fallida:  ${error?.original?.detail || error}`
      );
    }
  }

  async findOne(id) {
    try {
      const customer = await models.BookingCustomers.findAll({
        where: {
          customerId: id,
        },
      });
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
        include: ['type_id', 'customer_type', 'travel_id'],
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
      await _customersService.update(resp.customerId, { travelId: resp.travelId });
      return resp;
    } catch (error) {
      throw boom.failedDependency(
        `Creación fallida: ${error?.original?.detail || error}`
      );
    }
  }

  async addPrice(id, changes) {
    try {
      const customer = await this.findOne(id);
      await models.BookingCustomers.update(changes, {where: { id: customer[0]?.dataValues?.id }});
      return customer;
    } catch (error) {
      throw boom.badRequest(
        `Actualización fallida: ${error?.original?.detail || error}`
      );
    }
  }

  async delete(id) {
    try {
      const customer = await this.findOne(id);
      if (customer) {
        await _customersService.update(customer[0]?.dataValues?.customerId, { travelId: null });
        await models.BookingCustomers.destroy({
          where: { customerId: id },
        });
        return { id };
      }
    } catch (error) {
      throw boom.badRequest(
        `Eliminación fallida: ${error?.original?.detail || error}`
      );
    }
  }
}

module.exports = BookingCustomersService;
