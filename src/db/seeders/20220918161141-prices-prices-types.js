'use strict';

const { PRICES_TABLE } = require('../models/pricesModel');
const { PRICES_TYPE_TABLE } = require('../models/pricesTypeModel');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(PRICES_TYPE_TABLE, [{
		id: 1,
		name: 'Adulto',
		seat_available: true
	}, {
		id: 2,
		name: 'Niño',
		seat_available: true
	}, {
		id: 3,
		name: 'Infante',
		seat_available: false
	}, {
		id: 4,
		name: 'Poliza',
		seat_available: false
	}]);

	await queryInterface.bulkInsert(PRICES_TABLE, [{
		"id": 1,
		"price_type_id": 1,
		"travel_id": 1,
		"value": 90000,
		"created_at": "02/03/2022",
	}, {
		"id": 2,
		"price_type_id": 2,
		"travel_id": 1,
		"value": 50000,
		"created_at": "02/03/2022",
  	}]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(PRICES_TYPE_TABLE, null, {});
	await queryInterface.bulkDelete(PRICES_TABLE, null, {});
  }
};
