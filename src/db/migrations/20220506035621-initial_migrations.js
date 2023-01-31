'use strict';

const { CUSTOMER_TABLE, CustomerSchema } = require('../models/customerModel');
const { USER_TABLE, UserSchema } = require('../models/userModel');
const { BUS_TABLE, BusSchema } = require('../models/busModel');
const { COMPANY_TABLE, CompanySchema } = require('../models/busCompanyModel');
const { TYPE_ID_TABLE, TypeIdSchema } = require('../models/typeIdModel');
const { CUSTOMER_TYPE_TABLE, CustomerTypeSchema } = require('../models/customerTypeModel');
const { ROLE_TABLE, RoleSchema } = require('../models/roleModel');
const { TRAVELS_DESTINATION_TABLE, TravelsDestinationSchema } = require('../models/travelsDestinationModel');
const { PRICES_TYPE_TABLE, PricesTypeSchema } = require('../models/pricesTypeModel');
const { TRAVEL_TABLE, TravelSchema } = require('../models/travelModel');
const { PRICES_TABLE, PricesSchema } = require('../models/pricesModel');
const { BOOKING_TABLE, BookingSchema } = require('../models/bookingModel');
const { BOOKING_CUSTOMERS_TABLE, BookingCustomersSchema } = require('../models/bookingCustomersModel');
const { COMPANIONS_X_CUSTOMERS_TABLE, CompanionsXCustomersSchema } = require('../models/companionsXCustomersModel');

module.exports = {
	async up (queryInterface) {
		await queryInterface.createTable(COMPANY_TABLE, CompanySchema);
		await queryInterface.createTable(TYPE_ID_TABLE, TypeIdSchema);
		await queryInterface.createTable(CUSTOMER_TYPE_TABLE, CustomerTypeSchema);
		await queryInterface.createTable(ROLE_TABLE, RoleSchema);
		await queryInterface.createTable(USER_TABLE, UserSchema);
		await queryInterface.createTable(BUS_TABLE, BusSchema);
		await queryInterface.createTable(TRAVELS_DESTINATION_TABLE, TravelsDestinationSchema);
		await queryInterface.createTable(PRICES_TYPE_TABLE, PricesTypeSchema);
		await queryInterface.createTable(TRAVEL_TABLE, TravelSchema);
		await queryInterface.createTable(PRICES_TABLE, PricesSchema);
		await queryInterface.createTable(BOOKING_TABLE, BookingSchema);
		await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
		await queryInterface.createTable(BOOKING_CUSTOMERS_TABLE, BookingCustomersSchema);
		await queryInterface.createTable(COMPANIONS_X_CUSTOMERS_TABLE, CompanionsXCustomersSchema);
	},

	async down (queryInterface) {
		await queryInterface.dropTable(PRICES_TABLE);
		await queryInterface.dropTable(PRICES_TYPE_TABLE);
		await queryInterface.dropTable(USER_TABLE, UserSchema);
		await queryInterface.dropTable(ROLE_TABLE, RoleSchema);
		await queryInterface.dropTable(CUSTOMER_TABLE, CustomerSchema);
		await queryInterface.dropTable(BOOKING_CUSTOMERS_TABLE, BookingCustomersSchema);
		await queryInterface.dropTable(BOOKING_TABLE, BookingSchema);
		await queryInterface.dropTable(TRAVEL_TABLE, TravelSchema);
		await queryInterface.dropTable(BUS_TABLE, BusSchema);
		await queryInterface.dropTable(COMPANY_TABLE, CompanySchema);
		await queryInterface.dropTable(CUSTOMER_TYPE_TABLE, CustomerTypeSchema);
		await queryInterface.dropTable(TYPE_ID_TABLE, TypeIdSchema);
		await queryInterface.dropTable(TRAVELS_DESTINATION_TABLE);
		await queryInterface.dropTable(COMPANIONS_X_CUSTOMERS_TABLE, CompanionsXCustomersSchema);
	}
};
