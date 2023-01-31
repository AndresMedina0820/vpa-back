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
			throw boom.clientTimeout(`Conexión fallida: ${error?.original?.detail || error}}`);
		}
	}

	async findOne(id) {
		try {
			const user = await models.User.findByPk(id, {
				include: ['type_id', 'role']
			});
			if (!user) {
				return boom.notFound('Usuario no encontrado');
			}
			return user;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida: ${error?.original?.detail || error}}`);
		}
	}

	async create(data) {
		try {
			const response = await models.User.create(data);
			return response;
		} catch (error) {
			throw boom.failedDependency(`Creación fallida:  ${error?.original?.detail || error}}`);
		}
	}

	async update(id, changes) {
		try {
			const user = await this.findOne(id);
			await user.update(changes);
			return user;
		} catch (error) {
			throw boom.badRequest(`Actualización fallida: ${error?.original?.detail || error}`);
		}
	}

	async delete(id) {
		try {
			const user = await this.findOne(id);
			await user.destroy();
			return { id };
		} catch (error) {
			throw boom.badRequest(`Eliminación fallida: ${error?.original?.detail || error}`);
		}
	}
}

module.exports = UsersService;
