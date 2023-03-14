const { models } = require('../libs/sequelize_connection');
const { Sequelize } = require('sequelize');
const boom = require('@hapi/boom');

class TravelsService {
	constructor() {}

	async find({ limit = 5, offset = 0, keyword = '' }) {
		try {
      let count;
      let options = {
        where: {
          [Sequelize.Op.or]: [
            {
              name: { [Sequelize.Op.iLike]: `%${keyword}%` },
            },
          ],
        },
        include: [
					{
						model: models.Bus,
						as: 'bus',
						attributes: ['id', 'licensePlate', 'capacity'],
						include: {
							model: models.Company,
							as: 'company',
							attributes: ['id', 'name'],
						}
					},
					{
						model: models.TravelsDestination,
						as: 'destination',
						attributes: ['id','name']
					}
				],
        order: [['id', 'DESC']],
        limit: limit,
        offset: offset,
      };

			const travels = await models.Travel.findAll(options);
      count = await models.Travel.count(keyword ? options : null);

			return { travels: [...travels], count: count };
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error?.original?.detail || error}`);
		}
	}

	async findOne(id) {
		try {
			const travel = await models.Travel.findByPk(id, {
				include: [
					{
						model: models.Bus,
						as: 'bus',
						attributes: ['id', 'licensePlate', 'capacity'],
						include: {
							model: models.Company,
							as: 'company',
							attributes: ['id', 'name']
						}
					},
					{
						model: models.TravelsDestination,
						as: 'destination',
						attributes: ['id', 'name']
					}
				],
			});
			if (!travel) {
				throw boom.notFound('Viaje no encontrado');
			}
			return travel;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error?.original?.detail || error}`);
		}
	}

	async create(data) {
		try {
			const resp = await models.Travel.create(data);
			return resp;
		} catch (error) {
			throw boom.failedDependency(`Creación fallida:`, error);
		}
	}

	async update(id, changes) {
		try {
			const travel = await this.findOne(id);
			await travel.update(changes);
			return travel;
		} catch (error) {
			throw boom.badRequest(`Actualización fallida: ${error?.original?.detail || error}`);
		}
	}

	async delete(id) {
		try {
			const travel = await this.findOne(id);
			await travel.destroy();
			return { id };
		} catch (error) {
			throw boom.badRequest(`Eliminación fallida: ${error?.original?.detail || error}`);
		}
	}
}

module.exports = TravelsService;
