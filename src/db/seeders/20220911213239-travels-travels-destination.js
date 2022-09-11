'use strict';

const { TRAVELS_DESTINATION_TABLE } = require('../models/travelsDestinationModel');
const { TRAVEL_TABLE } = require('../models/travelModel');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(TRAVELS_DESTINATION_TABLE, [{
		id: 0,
		name: 'Consota'
	}, {
		id: 1,
		name: 'Medellin'
	}, {
		id: 2,
		name: 'Salento'
	}]);

	await queryInterface.bulkInsert(TRAVEL_TABLE, [{
		"id": 0,
		"name": 'Pasadia Consota',
		"destination_id": 0,
		"departure_date": '12/12/2022',
		"bus_id": 2,
		"departure_location": 'Estadio',
		"observations": 'Llevar cupones',
		"picture": null,
		"created_at": "02/03/2022",
	}, {
		"id": 1,
		"name": 'Tour Antioquia',
		"destination_id": 1,
		"departure_date": '12/11/2022',
		"bus_id": 0,
		"departure_location": 'Estadio',
		"observations": 'Llevar Almuerzos',
		"picture": null,
		"created_at": "03/03/2022",
  	}]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(TRAVELS_DESTINATION_TABLE, null, {});
	await queryInterface.bulkDelete(TRAVEL_TABLE, null, {});
  }
};
