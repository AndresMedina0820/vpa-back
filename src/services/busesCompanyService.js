const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');

class BusesCompanyService {
	constructor() {}

	async find() {
		try {
			const companies = await models.Company.findAll();
			return companies;
		} catch (error) {
			throw boom.clientTimeout(`Fail Connection:  ${error.original.detail}`);
		}
	}

	async findOne(id) {
		try {
			const company = await models.Company.findByPk(id);
			if (!company) {
				throw boom.notFound('Company not found');
			}
			return company;
		} catch (error) {
			throw boom.clientTimeout(`Fail Connection:  ${error.original.detail}`);
		}
	}

	async create(data) {
		try {
			const resp = await models.Company.create(data);
			return resp;
		} catch (error) {
			throw boom.failedDependency(`Created Failed: ${error.original.detail}`);
		}
	}

	async update(id, changes) {
		try {
			const company = await this.findOne(id);
			await company.update(changes);
			return company;
		} catch (error) {
			throw boom.badRequest(`Updated Failed: ${error.original.detail}`);
		}
	}

	async delete(id) {
		try {
			const company = await this.findOne(id);
			await company.destroy();
			return { id };
		} catch (error) {
			throw boom.badRequest(`Delete Failed: ${error.original.detail}`);
		}
	}
}

module.exports = BusesCompanyService;
