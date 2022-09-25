const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');

class TypeCustomerService {
	constructor() {}

	async find() {
		try {
			const types = await models.CustomerType.findAll();
			return types;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error.original.detail}`);
		}
	}

	async findOne(id) {
		try {
			const type = await models.CustomerType.findByPk(id);
			if (!type) {
				throw boom.notFound('Tipo de cliente no encontrado');
			}
			return type;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error.original.detail}`);
		}
	}

	async create(data) {
		try {
			const resp = await models.CustomerType.create(data);
			return resp;
		} catch (error) {
			throw boom.failedDependency(`Creación fallida: ${error.original.detail}`);
		}
	}

	async update(id, changes) {
		try {
			const type = await this.findOne(id);
			await type.update(changes);
			return type;
		} catch (error) {
			throw boom.badRequest(`Actualización fallida: ${error.original.detail}`);
		}
	}

	async delete(id) {
		try {
			const type = await this.findOne(id);
			await type.destroy();
			return { id };
		} catch (error) {
			throw boom.badRequest(`Eliminación fallida: ${error.original.detail}`);
		}
	}
}

module.exports = TypeCustomerService;
