const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');

class CustomersService {
	constructor() {}

	async find() {
		try {
			const customers = await models.Customer.findAll({
				include: ['type_id', 'customer_type'],
				order: [
					['id', 'DESC']
				]
			});
			return customers;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error.original.detail}`);
		}
	}

	async findOne(id) {
		try {
			const customer = await models.Customer.findByPk(id, {
				include: ['type_id', 'customer_type']
			});
			if (!customer) {
				throw boom.notFound('Cliente no encontrado');
			}
			return customer;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error.original.detail}`);
		}
	}

	async create(data) {
		try {
			const resp = await models.Customer.create(data);
			return resp;
		} catch (error) {
			throw boom.failedDependency(`Creación fallida: ${error.original.detail}`);
		}
	}

	async update(id, changes) {
		try {
			const customer = await this.findOne(id);
			await customer.update(changes);
			return customer;
		} catch (error) {
			throw boom.badRequest(`Actualización fallida: ${error.original.detail}`);
		}
	}

	async delete(id) {
		try {
			const customer = await this.findOne(id);
			await customer.destroy();
			return { id };
		} catch (error) {
			throw boom.badRequest(`Eliminación fallida: ${error.original.detail}`);
		}
	}
}

module.exports = CustomersService;
