const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');

class UsersService {
	constructor() {}

	async find() {
		const users = await models.User.findAll({
			include: ['type_id', 'role']
		});
		return users;
	}

	async findOne(id) {
		const user = await models.User.findByPk(id, {
			include: ['type_id', 'role']
		});
		if (!user) {
			return boom.notFound('User not found');
		}
		return user;
	}

	async create(data) {
		const response = await models.User.create(data);
		return response;
	}

	async update(id, changes) {
		const user = await this.findOne(id);
		await user.update(changes);
		return user;
	}

	async delete(id) {
		const user = await this.findOne(id);
		await user.destroy();
		return { id };
	}
}

module.exports = UsersService;
