'use strict';
const { CUSTOMER_TYPE_TABLE } = require('../models/customerTypeModel');

module.exports = {
	async up (queryInterface) {
		await queryInterface.bulkInsert(CUSTOMER_TYPE_TABLE, [{
			id: 1,
			name: 'Interno'
		}, {
			id: 2,
			name: 'Externo'
		}]);
	},

	async down (queryInterface) {
		await queryInterface.bulkDelete(CUSTOMER_TYPE_TABLE, null, {});
	}
};
