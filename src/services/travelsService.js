const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');

class TravelsService {
	constructor() {}

	async find() {
		try {
			const travels = await models.Travel.findAll({
				include: [
					{
						model: models.Bus,
						as: 'bus',
						attributes: ['licensePlate', 'capacity'],
						include: {
							model: models.Company,
							as: 'company',
							attributes: ['name']
						}
					},
					{
						model: models.TravelsDestination,
						as: 'destination',
						attributes: ['name']
					},
					{
						model: models.Prices,
						as: 'prices',
						attributes: ['value'],
						include: {
							model: models.PricesType,
							as: 'price_type',
							attributes: ['name', 'seatAvailable']
						}
					}
				],
			});
			return travels;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error.original.detail}`);
		}
	}

	async findOne(id) {
		try {
			const travel = await models.Travel.findByPk(id, {
				include: [
					{
						model: models.Bus,
						as: 'bus',
						attributes: ['licensePlate', 'capacity'],
						include: {
							model: models.Company,
							as: 'company',
							attributes: ['name']
						}
					},
					{
						model: models.TravelsDestination,
						as: 'destination',
						attributes: ['name']
					},
					{
						model: models.Prices,
						as: 'prices',
						attributes: ['value'],
						include: {
							model: models.PricesType,
							as: 'price_type',
							attributes: ['name', 'seatAvailable']
						}
					}
				],
			});
			if (!travel) {
				throw boom.notFound('Viaje no encontrado');
			}
			return travel;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error.original.detail}`);
		}
	}

	async create(data) {
		try {
			const resp = await models.Travel.create(data);
			return resp;
		} catch (error) {
			throw boom.failedDependency(`Creación fallida: ${error.original.detail}`);
		}
	}

	async update(id, changes) {
		try {
			const travel = await this.findOne(id);
			await travel.update(changes);
			return travel;
		} catch (error) {
			throw boom.badRequest(`Actualización fallida: ${error.original.detail}`);
		}
	}

	async delete(id) {
		try {
			const travel = await this.findOne(id);
			await travel.destroy();
			return { id };
		} catch (error) {
			throw boom.badRequest(`Eliminación fallida: ${error.original.detail}`);
		}
	}
}

module.exports = TravelsService;
