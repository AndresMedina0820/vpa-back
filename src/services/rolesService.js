const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');

class RoleService {
	constructor() {}

	async find() {
		try {
			const roles = await models.Role.findAll();
			return roles;
		} catch (error) {
			throw boom.clientTimeout(`Fail Connection:  ${error.original.detail}`);
		}
	}

	async findOne(id) {
		try {
			const role = await models.Role.findByPk(id);
			if (!role) {
				throw boom.notFound('Role not found');
			}
			return role;
		} catch (error) {
			throw boom.clientTimeout(`Fail Connection:  ${error.original.detail}`);
		}
	}

	async create(data) {
		try {
			const resp = await models.Role.create(data);
			return resp;
		} catch (error) {
			throw boom.failedDependency(`Created Failed: ${error.original.detail}`);
		}
	}

	async update(id, changes) {
		try {
			const role = await this.findOne(id);
			await role.update(changes);
			return role;
		} catch (error) {
			throw boom.badRequest(`Updated Failed: ${error.original.detail}`);
		}
	}

	async delete(id) {
		try {
			const role = await this.findOne(id);
			await role.destroy();
			return { id };
		} catch (error) {
			throw boom.badRequest(`Delete Failed: ${error.original.detail}`);
		}
	}
}

module.exports = RoleService;
