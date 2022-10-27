const { models } = require('../libs/sequelize_connection');
const boom = require('@hapi/boom');

class BookingsService {
	constructor() {}

	async find() {
		try {
			const bookings = await models.Booking.findAll({
				include: [
					{
						model: models.Travel,
						as: 'travel',
						attributes: ['id', 'name', 'destinationId', 'departureDate', 'busId', 'departureLocation', 'observations', 'picture'],
						include: [{
							model: models.TravelsDestination,
							as: 'destination',
							attributes: ['id', 'name'],
						}, {
							model: models.Bus,
							as: 'bus',
							attributes: ['id', 'licensePlate', 'capacity'],
							include: {
								model: models.Company,
								as: 'company',
								attributes: ['id', 'name']
							}
						}],
					},
				],
			});
			return bookings;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error.original.detail}`);
		}
	}

	async findOne(id) {
		try {
			const booking = await models.Booking.findByPk(id, {
				include: [
					{
						model: models.Travel,
						as: 'travel',
						attributes: ['id', 'name', 'destinationId', 'departureDate', 'busId', 'departureLocation', 'observations', 'picture'],
						include: [{
							model: models.TravelsDestination,
							as: 'destination',
							attributes: ['id', 'name'],
						}, {
							model: models.Bus,
							as: 'bus',
							attributes: ['id', 'licensePlate', 'capacity'],
							include: {
								model: models.Company,
								as: 'company',
								attributes: ['id', 'name']
							}
						}],
					},
				],
			});
			if (!booking) {
				throw boom.notFound('Reserva no encontrada');
			}
			return booking;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error.original.detail}`);
		}
	}

	async findByTravel(travelId) {
		try {
			const booking = await models.Booking.findAll({
				where: {
					travelId: travelId
				},
				include: [
					{
						model: models.Travel,
						as: 'travel',
						attributes: ['id', 'name', 'destinationId', 'departureDate', 'busId', 'departureLocation', 'observations', 'picture'],
						include: [{
							model: models.TravelsDestination,
							as: 'destination',
							attributes: ['id', 'name'],
						}, {
							model: models.Bus,
							as: 'bus',
							attributes: ['id', 'licensePlate', 'capacity'],
							include: {
								model: models.Company,
								as: 'company',
								attributes: ['id', 'name']
							}
						}],
					},
				],
			});
			return booking;
		} catch (error) {
			throw boom.clientTimeout(`Conexión fallida:  ${error.original.detail}`);
		}
	}

	async create(data) {
		try {
			const resp = await models.Booking.create(data);
			return resp;
		} catch (error) {
			throw boom.failedDependency(`Creación fallida:`, error);
		}
	}

	async update(id, changes) {
		try {
			const booking = await this.findOne(id);
			await booking.update(changes);
			return booking;
		} catch (error) {
			throw boom.badRequest(`Actualización fallida: ${error.original.detail}`);
		}
	}

	async delete(id) {
		try {
			const booking = await this.findOne(id);
			await booking.destroy();
			return { id };
		} catch (error) {
			throw boom.badRequest(`Eliminación fallida: ${error.original.detail}`);
		}
	}
}

module.exports = BookingsService;
