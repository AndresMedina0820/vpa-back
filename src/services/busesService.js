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
			throw boom.clientTimeout(`Fail Connection:  ${error.original.detail}`);
		}
	}

	async findOne(id) {
		try {
			const bus = await models.Bus.findByPk(id, {
				include: ['company']
			});
			if (!bus) {
				throw boom.notFound('Bus not found');
			}
			return bus;
		} catch (error) {
			throw boom.clientTimeout(`Fail Connection:  ${error.original.detail}`);
		}
	}

	async create(data) {
		try {
			const response = await models.Bus.create(data);
			return response;
		} catch (error) {
			throw boom.failedDependency(`Created Failed: ${error.original.detail}`);
		}
	}

	async update(id, changes) {
		try {
			const bus = await this.findOne(id);
			await bus.update(changes);
			return bus;
		} catch (error) {
			throw boom.badRequest(`Updated Failed:  ${error.original.detail}`)
		}
	}

	async delete(id) {
		try {
			const bus = await this.findOne(id);
			await bus.destroy();
			return { id };
		} catch (error) {
			throw boom.badRequest(`Deleted Failed:  ${error.original.detail}`)
		}
	}
}

module.exports = BusesService;
