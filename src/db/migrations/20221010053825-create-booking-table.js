'use strict';

const { BOOKING_TABLE, BookingSchema } = require('../models/bookingModel');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(BOOKING_TABLE, BookingSchema);
  },

  async down (queryInterface) {
    await queryInterface.createTable(BOOKING_TABLE);
  }
};
