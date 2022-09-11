'use strict';

const { TRAVELS_PRICESXTRAVEL_TABLE, TravelsPriceXTravelSchema } = require('../models/travelsPriceXTravelModel');

module.exports = {
  async up (queryInterface, Sequelize) {
	await queryInterface.createTable(TRAVELS_PRICESXTRAVEL_TABLE, TravelsPriceXTravelSchema);
  },

  async down (queryInterface, Sequelize) {
	await queryInterface.createTable(TRAVELS_PRICESXTRAVEL_TABLE);
  }
};
