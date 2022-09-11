const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');

class TravelsService {
	constructor() {}

	async find() {
		try {
			const travels = await models.Travel.findAll({
				// include: ['type_id', 'customer_type'],
				// order: [
				// 	['id', 'DESC']
				// ]
			});
			return travels;
		} catch (error) {
			throw boom.clientTimeout(`Fail Connection:  ${error.original.detail}`);
		}
	}

	async findOne(id) {
		try {
			const travel = await models.Travel.findByPk(id, {
				// include: ['type_id', 'customer_type']
			});
			if (!travel) {
				throw boom.notFound('Travel not found');
			}
			return travel;
		} catch (error) {
			throw boom.clientTimeout(`Fail Connection:  ${error.original.detail}`);
		}
	}

	async create(data) {
		try {
			const resp = await models.Travel.create(data);
			return resp;
		} catch (error) {
			throw boom.failedDependency(`Created Failed: ${error.original.detail}`);
		}
	}

	async update(id, changes) {
		try {
			const travel = await this.findOne(id);
			await travel.update(changes);
			return travel;
		} catch (error) {
			throw boom.badRequest(`Updated Failed: ${error.original.detail}`);
		}
	}

	async delete(id) {
		try {
			const travel = await this.findOne(id);
			await travel.destroy();
			return { id };
		} catch (error) {
			throw boom.badRequest(`Delete Failed: ${error.original.detail}`);
		}
	}
}

module.exports = TravelsService;
