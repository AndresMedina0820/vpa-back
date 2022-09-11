const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');

class PricesService {
	constructor() {}

	async find() {
		try {
			const prices = await models.Prices.findAll({
				// include: ['type_id', 'customer_type'],
				// order: [
				// 	['id', 'DESC']
				// ]
			});
			return prices;
		} catch (error) {
			throw boom.clientTimeout(`Fail Connection:  ${error.original.detail}`);
		}
	}

	async findOne(id) {
		try {
			const price = await models.Prices.findByPk(id, {
				// include: ['type_id', 'customer_type']
			});
			if (!price) {
				throw boom.notFound('Price not found');
			}
			return price;
		} catch (error) {
			throw boom.clientTimeout(`Fail Connection:  ${error.original.detail}`);
		}
	}

	async create(data) {
		try {
			const resp = await models.Prices.create(data);
			return resp;
		} catch (error) {
			throw boom.failedDependency(`Created Failed: ${error.original.detail}`);
		}
	}

	async update(id, changes) {
		try {
			const price = await this.findOne(id);
			await price.update(changes);
			return price;
		} catch (error) {
			throw boom.badRequest(`Updated Failed: ${error.original.detail}`);
		}
	}

	async delete(id) {
		try {
			const price = await this.findOne(id);
			await price.destroy();
			return { id };
		} catch (error) {
			throw boom.badRequest(`Delete Failed: ${error.original.detail}`);
		}
	}
}

module.exports = PricesService;
