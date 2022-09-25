const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');

class PricesService {
	constructor() {}

	async find() {
		try {
			const prices = await models.Prices.findAll();
			return prices;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error.original.detail}`);
		}
	}

	async findOne(id) {
		try {
			const price = await models.Prices.findByPk(id, {
				include: ['price_type', 'travel'],
			});
			if (!price) {
				throw boom.notFound('Precio no encontrado');
			}
			return price;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error.original.detail}`);
		}
	}

	async create(data) {
		try {
			const resp = await models.Prices.create(data);
			return resp;
		} catch (error) {
			throw boom.failedDependency(`Creación fallida: ${error.original.detail}`);
		}
	}

	async update(id, changes) {
		try {
			const price = await this.findOne(id);
			await price.update(changes);
			return price;
		} catch (error) {
			throw boom.badRequest(`Actualización fallida: ${error.original.detail}`);
		}
	}

	async delete(id) {
		try {
			const price = await this.findOne(id);
			await price.destroy();
			return { id };
		} catch (error) {
			throw boom.badRequest(`Eliminación fallida: ${error.original.detail}`);
		}
	}
}

module.exports = PricesService;
