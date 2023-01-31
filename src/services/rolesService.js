const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');

class RoleService {
	constructor() {}

	async find() {
		try {
			const roles = await models.Role.findAll();
			return roles;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error?.original?.detail || error}`);
		}
	}

	async findOne(id) {
		try {
			const role = await models.Role.findByPk(id);
			if (!role) {
				throw boom.notFound('Rol no encontrado');
			}
			return role;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error?.original?.detail || error}`);
		}
	}

	async create(data) {
		try {
			const resp = await models.Role.create(data);
			return resp;
		} catch (error) {
			throw boom.failedDependency(`Creación fallida: ${error?.original?.detail || error}`);
		}
	}

	async update(id, changes) {
		try {
			const role = await this.findOne(id);
			await role.update(changes);
			return role;
		} catch (error) {
			throw boom.badRequest(`Actualización fallida: ${error?.original?.detail || error}`);
		}
	}

	async delete(id) {
		try {
			const role = await this.findOne(id);
			await role.destroy();
			return { id };
		} catch (error) {
			throw boom.badRequest(`Eliminación fallida: ${error?.original?.detail || error}`);
		}
	}
}

module.exports = RoleService;
