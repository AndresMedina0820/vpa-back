'use strict';
const { TYPE_ID_TABLE } = require('../models/typeIdModel');

module.exports = {
	async up (queryInterface) {
		await queryInterface.bulkInsert(TYPE_ID_TABLE, [{
			id: 1,
			name: 'CC'
		}, {
			id: 2,
			name: 'TI'
		}, {
			id: 3,
			name: 'Registro Civil'
		}]);
	},

	async down (queryInterface) {
		await queryInterface.bulkDelete(TYPE_ID_TABLE, null, {});
	}
};
