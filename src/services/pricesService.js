const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');

class PricesService {
	constructor() {}

	async find() {
		try {
			const prices = await models.Prices.findAll({
				include: [
					{
						model: models.PricesType,
						as: 'price_type',
						attributes: ['id', 'name', 'seatAvailable'],
					},
					{
						model: models.Travel,
						as: 'travel',
						attributes: ['id','name']
					}
				],
			});
			return prices;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error?.original?.detail || error}`);
		}
	}

	async findByTravel(travelId) {
		console.log(travelId);
		try {
			const prices = await models.Prices.findAll({
				where: {
					travelId: travelId
				},
				include: [
					{
						model: models.PricesType,
						as: 'price_type',
						attributes: ['id', 'name', 'seatAvailable'],
					}
				],
			});
			return prices;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error?.original?.detail || error}`);
		}
	}

	async findOne(id) {
		try {
			const price = await models.Prices.findByPk(id, {
				order: [
					['id', 'DESC']
				],
				include: [
					{
						model: models.PricesType,
						as: 'price_type',
						attributes: ['id', 'name', 'seatAvailable'],
					},
					{
						model: models.Travel,
						as: 'travel',
						attributes: ['id','name']
					}
				],
			});
			if (!price) {
				throw boom.notFound('Precio no encontrado');
			}
			return price;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error?.original?.detail || error}}`);
		}
	}

	async create(data) {
		try {
			const res = await models.Prices.create(data);
			return res;
		} catch (error) {
			throw boom.failedDependency(`Creación fallida: ${error?.original?.detail || error}`);
		}
	}

	async update(id, changes) {
		try {
			const price = await this.findOne(id);
			await price.update(changes);
			return price;
		} catch (error) {
			throw boom.badRequest(`Actualización fallida: ${error?.original?.detail || error}`);
		}
	}

	async delete(id) {
		try {
			const price = await this.findOne(id);
			await price.destroy();
			return { id };
		} catch (error) {
			throw boom.badRequest(`Eliminación fallida: ${error?.original?.detail || error}`);
		}
	}
}

module.exports = PricesService;
