const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');
const CustomersService = require('./customersService');
const _customersService = new CustomersService();

class CompanionsXCustomersService {
  constructor() {}

  async findByCustomer(id) {
    try {
      const customers = await models.CompanionsXCustomers.findAll({
        where: {
          customerId: id,
        },
        include: [
          {
            model: models.Customer,
            as: 'companion',
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
              'address',
              'customerType',
            ],
            include: [
              {
                model: models.TypeId,
                as: 'type_id',
                attributes: ['id', 'name'],
              },
              {
                model: models.CustomerType,
                as: 'customer_type',
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

  async findByCompanion(id) {
    try {
      const companion = await models.CompanionsXCustomers.findAll({
        where: {
          companionId: id,
        },
        include: [
          {
            model: models.Customer,
            as: 'companion',
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
              'address',
              'customerType',
            ],
            include: [
              {
                model: models.TypeId,
                as: 'type_id',
                attributes: ['id', 'name'],
              },
              {
                model: models.CustomerType,
                as: 'customer_type',
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
      });
      return companion;
    } catch (error) {
      throw boom.clientTimeout(
        `Conexión fallida: ${error?.original?.detail || error}`
      );
    }
  }

  async create(data) {
    try {
      const resp = await models.CompanionsXCustomers.create(data);
      const customer = await _customersService.findOne(resp.companionId);
      await _customersService.update(customer.id, { travelId: data.travelId });
      return resp;
    } catch (error) {
      throw boom.failedDependency(
        `Creación fallida: ${error?.original?.detail || error}`
      );
    }
  }

  async delete(id) {
    try {
      const data = await this.findByCompanion(id);
      if (data) {
        await _customersService.update(data[0]?.dataValues?.companionId, { travelId: null });
        await models.CompanionsXCustomers.destroy({
          where: { companionId: id },
        });
        return { id };
      } else {
        return "Usuario no encontrado";
      }
    } catch (error) {
      throw boom.badRequest(
        `Eliminación fallida: ${error?.original?.detail || error}`
      );
    }
  }
}

module.exports = CompanionsXCustomersService;
