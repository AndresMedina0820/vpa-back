const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');

class PricesTypeService {
	constructor() {}

	async find() {
		try {
			const pricesType = await models.PricesType.findAll();
			return pricesType;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error?.original?.detail || error}`);
		}
	}

	async findOne(id) {
		try {
			const priceType = await models.PricesType.findByPk(id);
			if (!priceType) {
				throw boom.notFound('Tipo de precio no encontrado');
			}
			return priceType;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error?.original?.detail || error}`);
		}
	}

	async create(data) {
		try {
			const resp = await models.PricesType.create(data);
			return resp;
		} catch (error) {
			throw boom.failedDependency(`Creación fallida: ${error?.original?.detail || error}`);
		}
	}

	async update(id, changes) {
		try {
			const priceType = await this.findOne(id);
			await priceType.update(changes);
			return priceType;
		} catch (error) {
			throw boom.badRequest(`Actualización fallida: ${error?.original?.detail || error}`);
		}
	}

	async delete(id) {
		try {
			const priceType = await this.findOne(id);
			await priceType.destroy();
			return { id };
		} catch (error) {
			throw boom.badRequest(`Eliminación fallida: ${error?.original?.detail || error}`);
		}
	}
}

module.exports = PricesTypeService;
