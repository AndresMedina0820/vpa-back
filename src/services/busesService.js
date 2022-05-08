const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');

class UsersService {
	constructor() {}

	async find() {
		const buses = await models.Bus.findAll({
			include: ['company']
		});
		return buses;
	}

	async findOne(id) {
		const bus = await models.Bus.findByPk(id, {
			include: ['company']
		});
		if (!bus) {
			throw boom.notFound('Bus not found');
		}
		return bus;
	}

	async create(data) {
		const response = await models.Bus.create(data);
		return response;
	}

	async update(id, changes) {
		const bus = await this.findOne(id);
		await bus.update(changes);
		return bus;
	}

	async delete(id) {
		const bus = await this.findOne(id);
		await bus.destroy();
		return { id };
	}
}

module.exports = UsersService;
