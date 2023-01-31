const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');

class BusesCompanyService {
	constructor() {}

	async find() {
		try {
			const companies = await models.Company.findAll();
			return companies;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error?.original?.detail || error}`);
		}
	}

	async findOne(id) {
		try {
			const company = await models.Company.findByPk(id);
			if (!company) {
				throw boom.notFound('Compañia no encontrada');
			}
			return company;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error?.original?.detail || error}`);
		}
	}

	async create(data) {
		try {
			const resp = await models.Company.create(data);
			return resp;
		} catch (error) {
			throw boom.failedDependency(`Creación fallida: ${error?.original?.detail || error}`);
		}
	}

	async update(id, changes) {
		try {
			const company = await this.findOne(id);
			await company.update(changes);
			return company;
		} catch (error) {
			throw boom.badRequest(`Actualización fallida: ${error?.original?.detail || error}`);
		}
	}

	async delete(id) {
		try {
			const company = await this.findOne(id);
			await company.destroy();
			return { id };
		} catch (error) {
			throw boom.badRequest(`Eliminación fallida: ${error?.original?.detail || error}`);
		}
	}
}

module.exports = BusesCompanyService;
