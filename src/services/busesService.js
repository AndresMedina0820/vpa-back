const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');

class BusesService {
	constructor() {}

	async find() {
		try {
			const buses = await models.Bus.findAll({
				include: ['company'],
				order: [
					['id', 'DESC']
				]
			});
			return buses;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error?.original?.detail || error}`);
		}
	}

	async findOne(id) {
		try {
			const bus = await models.Bus.findByPk(id, {
				include: ['company']
			});
			if (!bus) {
				throw boom.notFound('Bus no encontrado');
			}
			return bus;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error?.original?.detail || error}`);
		}
	}

	async create(data) {
		try {
			const response = await models.Bus.create(data);
			return response;
		} catch (error) {
			throw boom.failedDependency(`Creación fallida: ${error?.original?.detail || error}`);
		}
	}

	async update(id, changes) {
		try {
			const bus = await this.findOne(id);
			await bus.update(changes);
			return bus;
		} catch (error) {
			throw boom.badRequest(`Actualización fallida:  ${error?.original?.detail || error}`)
		}
	}

	async delete(id) {
		try {
			const bus = await this.findOne(id);
			await bus.destroy();
			return { id };
		} catch (error) {
			throw boom.badRequest(`Eliminación fallida:  ${error?.original?.detail || error}`)
		}
	}
}

module.exports = BusesService;
