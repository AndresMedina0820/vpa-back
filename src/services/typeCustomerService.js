const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');

class TypeCustomerService {
	constructor() {}

	async find() {
		try {
			const types = await models.CustomerType.findAll();
			return types;
		} catch (error) {
			throw boom.clientTimeout(`Fail Connection:  ${error.original.detail}`);
		}
	}

	async findOne(id) {
		try {
			const type = await models.CustomerType.findByPk(id);
			if (!type) {
				throw boom.notFound('Type Customer not found');
			}
			return type;
		} catch (error) {
			throw boom.clientTimeout(`Fail Connection:  ${error.original.detail}`);
		}
	}

	async create(data) {
		try {
			const resp = await models.CustomerType.create(data);
			return resp;
		} catch (error) {
			throw boom.failedDependency(`Created Failed: ${error.original.detail}`);
		}
	}

	async update(id, changes) {
		try {
			const type = await this.findOne(id);
			await type.update(changes);
			return type;
		} catch (error) {
			throw boom.badRequest(`Updated Failed: ${error.original.detail}`);
		}
	}

	async delete(id) {
		try {
			const type = await this.findOne(id);
			await type.destroy();
			return { id };
		} catch (error) {
			throw boom.badRequest(`Delete Failed: ${error.original.detail}`);
		}
	}
}

module.exports = TypeCustomerService;
