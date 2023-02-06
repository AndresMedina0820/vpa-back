const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');

class CompanionsXCustomersService {
	constructor() {}

	async find(id) {
    console.log(id)
		try {
			const customers = await models.CompanionsXCustomers.findAll({
				where: {
					customerId: id
				},
				include: [
					{
						model: models.Customer,
						as: 'companion',
						attributes: ['id', 'customerId', 'typeId', 'name', 'lastName', 'email', 'phone', 'city', 'address', 'customerType'],
						include: [{
							model: models.TypeId,
							as: 'type_id',
							attributes: ['id', 'name'],
						},{
              model: models.CustomerType,
							as: 'customer_type',
							attributes: ['id', 'name'],
            }],
					},
				],
			});
			return customers;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error?.original?.detail || error}`);
		}
	}

	async create(data) {
		try {
			const resp = await models.CompanionsXCustomers.create(data);
			return resp;
		} catch (error) {
			throw boom.failedDependency(`Creación fallida: ${error?.original?.detail || error}`);
		}
	}

	async delete(id) {
		try {
			const customer = await this.findOne(id);
			await customer.destroy();
			return { id };
		} catch (error) {
			throw boom.badRequest(`Eliminación fallida: ${error?.original?.detail || error}`);
		}
	}
}

module.exports = CompanionsXCustomersService;
