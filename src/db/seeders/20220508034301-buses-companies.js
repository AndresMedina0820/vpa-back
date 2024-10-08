'use strict';

const { BUS_TABLE } = require('../models/busModel');
const { COMPANY_TABLE } = require('../models/busCompanyModel');

module.exports = {
	async up (queryInterface) {
		await queryInterface.bulkInsert(COMPANY_TABLE, [{
			id: 1,
			name: 'Mercedes'
		}, {
			id: 2,
			name: 'Volvo'
		}, {
			id: 3,
			name: 'Chevrolet'
		}]);

		await queryInterface.bulkInsert(BUS_TABLE, [{
			"license_plate": "64127-074",
			"capacity": 38,
			"companyId": 1,
			"created_at": "01/06/2021"
		}, {
			"license_plate": "76237-176",
			"capacity": 25,
			"companyId": 1,
			"created_at": "02/03/2022"
		}, {
			"license_plate": "51655-561",
			"capacity": 35,
			"companyId": 1,
			"created_at": "02/03/2022"
		}, {
			"license_plate": "51531-9480",
			"capacity": 22,
			"companyId": 1,
			"created_at": "02/04/2022"
		}, {
			"license_plate": "61958-1701",
			"capacity": 34,
			"companyId": 1,
			"created_at": "02/02/2022"
		}, {
			"license_plate": "0113-4368",
			"capacity": 28,
			"companyId": 1,
			"created_at": "02/03/2022"
		}, {
			"license_plate": "13668-024",
			"capacity": 28,
			"companyId": 1,
			"created_at": "02/03/2022"
		}, {
			"license_plate": "68599-0202",
			"capacity": 30,
			"companyId": 2,
			"created_at": "02/03/2022"
		}, {
			"license_plate": "10191-1201",
			"capacity": 36,
			"companyId": 3,
			"created_at": "02/03/2022"
		}, {
			"license_plate": "52380-0540",
			"capacity": 26,
			"companyId": 1,
			"created_at": "02/03/2022"
		}]);
	},

	async down (queryInterface) {
		await queryInterface.bulkDelete(BUS_TABLE, null, {});
		await queryInterface.bulkDelete(COMPANY_TABLE, null, {});
	}
};
