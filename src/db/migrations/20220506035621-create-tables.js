'use strict';

const { CUSTOMER_TABLE, CustomerSchema } = require('../models/customerModel');
const { USER_TABLE, UserSchema } = require('../models/userModel');
const { BUS_TABLE, BusSchema } = require('../models/busModel');
const { COMPANY_TABLE, CompanySchema } = require('../models/busCompanyModel');
const { TYPE_ID_TABLE, TypeIdSchema } = require('../models/typeIdModel');
const { CUSTOMER_TYPE_TABLE, CustomerTypeSchema } = require('../models/customerTypeModel');
const { ROLE_TABLE, RoleSchema } = require('../models/roleModel');

module.exports = {
	async up (queryInterface) {
		await queryInterface.createTable(COMPANY_TABLE, CompanySchema);
		await queryInterface.createTable(TYPE_ID_TABLE, TypeIdSchema);
		await queryInterface.createTable(CUSTOMER_TYPE_TABLE, CustomerTypeSchema);
		await queryInterface.createTable(ROLE_TABLE, RoleSchema);
		await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
		await queryInterface.createTable(USER_TABLE, UserSchema);
		await queryInterface.createTable(BUS_TABLE, BusSchema);
	},

	async down (queryInterface) {
		await queryInterface.dropTable(CUSTOMER_TABLE, CustomerSchema);
		await queryInterface.dropTable(USER_TABLE, UserSchema);
		await queryInterface.dropTable(BUS_TABLE, BusSchema);
		await queryInterface.dropTable(COMPANY_TABLE, CompanySchema);
		await queryInterface.dropTable(TYPE_ID_TABLE, TypeIdSchema);
		await queryInterface.dropTable(CUSTOMER_TYPE_TABLE, CustomerTypeSchema);
		await queryInterface.dropTable(ROLE_TABLE, RoleSchema);
	}
};
