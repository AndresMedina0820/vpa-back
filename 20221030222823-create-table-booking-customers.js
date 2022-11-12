'use strict';

const { BOOKING_CUSTOMERS_TABLE, BookingCustomersSchema } = require('../models/bookingCustomersModel');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(BOOKING_CUSTOMERS_TABLE, BookingCustomersSchema);
  },

  async down (queryInterface) {
    await queryInterface.createTable(BOOKING_CUSTOMERS_TABLE);
  }
};
