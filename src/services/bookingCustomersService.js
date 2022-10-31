const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');

class BookingCustomersService {
	constructor() {}

	async find() {
		try {
			const customers = await models.BookingCustomers.findAll({
				include: [
					{
						model: models.Customer,
						as: 'customer',
						attributes: ['id', 'customerId', 'typeId', 'name', 'lastName', 'email', 'phone', 'city'],
						include: [{
							model: models.TypeId,
							as: 'type_id',
							attributes: ['id', 'name'],
						}],
					},
				],
			});
			return customers;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error}`);
		}
	}

	async findOne(id) {
		try {
			const customer = await models.BookingCustomers.findByPk(id);
			return customer;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error}`);
		}
	}

	async create(data) {
		try {
			const resp = await models.BookingCustomers.create(data);
			return resp;
		} catch (error) {
			throw boom.failedDependency(`Creación fallida:`, error);
		}
	}

	async delete(id) {
		try {
			const customer = await this.findOne(id);
			await customer.destroy();
			return { id };
		} catch (error) {
			throw boom.badRequest(`Eliminación fallida: ${error}`);
		}
	}
}

module.exports = BookingCustomersService;
