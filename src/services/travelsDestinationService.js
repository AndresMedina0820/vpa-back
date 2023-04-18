const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');

class TravelsDestinationService {
	constructor() {}

	async find() {
		try {
			const destinations = await models.TravelsDestination.findAll();
			return destinations;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error?.original?.detail || error}`);
		}
	}

	async findOne(id) {
		try {
			const destination = await models.TravelsDestination.findByPk(id);
			if (!destination) {
				throw boom.notFound('Destino no encontrado');
			}
			return destination;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error?.original?.detail || error}`);
		}
	}

	async create(data) {
		try {
			const resp = await models.TravelsDestination.create(data);
			return resp;
		} catch (error) {
			throw boom.failedDependency(`Creación fallida: ${error?.original?.detail || error}`);
		}
	}

	async update(id, changes) {
		try {
			const destination = await this.findOne(id);
			await destination.update(changes);
			return destination;
		} catch (error) {
			throw boom.badRequest(`Actualización fallida: ${error?.original?.detail || error}`);
		}
	}

	async delete(id) {
		try {
			const destination = await this.findOne(id);
			await destination.destroy();
			return { id };
		} catch (error) {
			throw boom.badRequest(`Eliminación fallida: ${error?.original?.detail || error}`);
		}
	}
}

module.exports = TravelsDestinationService;
