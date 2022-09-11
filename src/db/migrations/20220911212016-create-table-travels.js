'use strict';

const { TRAVEL_TABLE, TravelSchema } = require('../models/travelModel');

module.exports = {
  async up (queryInterface, Sequelize) {
	await queryInterface.createTable(TRAVEL_TABLE, TravelSchema);
  },

  async down (queryInterface, Sequelize) {
	await queryInterface.createTable(TRAVEL_TABLE);
  }
};
