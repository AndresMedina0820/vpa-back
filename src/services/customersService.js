const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');

class CustomersService {
	constructor() {}

	async find() {
		const customers = await models.Customer.findAll({
			include: ['type_id', 'customer_type']
		});
		return customers;
	}

	async findOne(id) {
		const customer = await models.Customer.findByPk(id, {
			include: ['type_id', 'customer_type']
		});
		if (!customer) {
			return boom.notFound('Customer not found');
		}
		return customer;
	}

	async create(data) {
		const response = await models.Customer.create(data);
		return response;
	}

	async update(id, changes) {
		const customer = await this.findOne(id);
		await customer.update(changes);
		return customer;
	}

	async delete(id) {
		const customer = await this.findOne(id);
		await customer.destroy();
		return { id };
	}
}

module.exports = CustomersService;
