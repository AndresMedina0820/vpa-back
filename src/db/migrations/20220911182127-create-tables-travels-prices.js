'use strict';

const { TRAVELS_DESTINATION_TABLE, TravelsDestinationSchema } = require('../models/travelsDestinationModel');
const { PRICES_TYPE_TABLE, PricesTypeSchema } = require('../models/pricesTypeModel');
const { PRICES_TABLE, PricesSchema } = require('../models/pricesModel');


module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(TRAVELS_DESTINATION_TABLE, TravelsDestinationSchema);
    await queryInterface.createTable(PRICES_TYPE_TABLE, PricesTypeSchema);
    await queryInterface.createTable(PRICES_TABLE, PricesSchema);
  },

  async down (queryInterface) {
    await queryInterface.createTable(TRAVELS_DESTINATION_TABLE);
    await queryInterface.createTable(PRICES_TYPE_TABLE);
    await queryInterface.createTable(PRICES_TABLE);
  }
};
