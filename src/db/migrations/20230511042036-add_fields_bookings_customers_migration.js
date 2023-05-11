'use strict';
const {
  BOOKING_CUSTOMERS_TABLE,
  BookingCustomersSchema,
} = require('../models/bookingCustomersModel');
const {
  COMPANIONS_X_CUSTOMERS_TABLE,
  CompanionsXCustomersSchema,
} = require('../models/companionsXCustomersModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // BOOKING CUSTOMERS
    await queryInterface.addColumn(
      BOOKING_CUSTOMERS_TABLE,
      'price_id',
      BookingCustomersSchema.priceId
    );
    await queryInterface.addColumn(
      BOOKING_CUSTOMERS_TABLE,
      'is_paid',
      BookingCustomersSchema.isPaid
    );
    await queryInterface.addColumn(
      BOOKING_CUSTOMERS_TABLE,
      'outstanding_balance',
      BookingCustomersSchema.outstandingBalance
    );

    // COMPANIONS CUSTOMERS
    await queryInterface.addColumn(
      COMPANIONS_X_CUSTOMERS_TABLE,
      'price_id',
      CompanionsXCustomersSchema.priceId
    );
    await queryInterface.addColumn(
      COMPANIONS_X_CUSTOMERS_TABLE,
      'is_paid',
      CompanionsXCustomersSchema.isPaid
    );
    await queryInterface.addColumn(
      COMPANIONS_X_CUSTOMERS_TABLE,
      'outstanding_balance',
      CompanionsXCustomersSchema.outstandingBalance
    );
  },

  async down(queryInterface, Sequelize) {
    // BOOKING CUSTOMERS
    await queryInterface.removeColumn(
      BOOKING_CUSTOMERS_TABLE,
      'price_id',
      BookingCustomersSchema.priceId
    );
    await queryInterface.removeColumn(
      BOOKING_CUSTOMERS_TABLE,
      'is_paid',
      BookingCustomersSchema.isPaid
    );
    await queryInterface.removeColumn(
      BOOKING_CUSTOMERS_TABLE,
      'outstanding_balance',
      BookingCustomersSchema.outstandingBalance
    );

    // COMPANIONS CUSTOMERS
    await queryInterface.removeColumn(
      COMPANIONS_X_CUSTOMERS_TABLE,
      'price_id',
      CompanionsXCustomersSchema.priceId
    );
    await queryInterface.removeColumn(
      COMPANIONS_X_CUSTOMERS_TABLE,
      'is_paid',
      CompanionsXCustomersSchema.isPaid
    );
    await queryInterface.removeColumn(
      COMPANIONS_X_CUSTOMERS_TABLE,
      'outstanding_balance',
      CompanionsXCustomersSchema.outstandingBalance
    );
  },
};
