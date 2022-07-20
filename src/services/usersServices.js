const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');

class UsersService {
	constructor() {}

	async find() {
		try {
			const users = await models.User.findAll({
				include: ['type_id', 'role'],
				order: [
					['id', 'DESC']
				]
			});
			return users;
		} catch (error) {
			throw boom.clientTimeout(`Client Timeout: ${error?.original?.detail}`);
		}
	}

	async findOne(id) {
		try {
			const user = await models.User.findByPk(id, {
				include: ['type_id', 'role']
			});
			if (!user) {
				return boom.notFound('User not found');
			}
			return user;
		} catch (error) {
			throw boom.clientTimeout(`Client Timeout: ${error?.original?.detail}`);
		}
	}

	async create(data) {
		try {
			const response = await models.User.create(data);
			return response;
		} catch (error) {
			throw boom.failedDependency(`Created Failed:  ${error?.original?.detail}`);
		}
	}

	async update(id, changes) {
		try {
			const user = await this.findOne(id);
			await user.update(changes);
			return user;
		} catch (error) {
			throw boom.badRequest(`Updated Failed: ${error.original.detail}`);
		}
	}

	async delete(id) {
		try {
			const user = await this.findOne(id);
			await user.destroy();
			return { id };
		} catch (error) {
			throw boom.badRequest(`Delete Failed: ${error.original.detail}`);
		}
	}
}

module.exports = UsersService;
