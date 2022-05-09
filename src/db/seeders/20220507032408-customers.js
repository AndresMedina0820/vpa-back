'use strict';
const { CUSTOMER_TABLE } = require('../models/customerModel');

module.exports = {
	async up (queryInterface) {
		await queryInterface.bulkInsert(CUSTOMER_TABLE, [{
			"customer_id": 812188,
			"name": "Desdemona",
			"last_name": "McMackin",
			"date_birth": "10/03/2022",
			"is_child": false,
			"email": "dmcmackin0@fc2.com",
			"phone": "540-779-1848",
			"city": "Smínthi",
			"address": "95 Debra Center",
			"created_at": "09/05/2022",
			"type_id": 2,
			"customer_type": 0
		}, {
			"customer_id": 393547,
			"name": "Dylan",
			"last_name": "Cavalier",
			"date_birth": "08/07/2021",
			"is_child": false,
			"email": "dcavalier1@acquirethisname.com",
			"phone": "173-745-0904",
			"city": "Akkol",
			"address": "5 Pankratz Park",
			"created_at": "09/05/2022",
			"type_id": 0,
			"customer_type": 1
		},
		{
			"customer_id": 981060,
			"name": "Glen",
			"last_name": "Fooks",
			"date_birth": "03/01/2022",
			"is_child": true,
			"email": "gfooks2@webnode.com",
			"phone": "798-567-5210",
			"city": "Skrzyszów",
			"address": "28 Mitchell Terrace",
			"created_at": "09/05/2022",
			"type_id": 2,
			"customer_type": 1
		}, {
			"customer_id": 85828,
			"name": "Loren",
			"last_name": "Schade",
			"date_birth": "04/02/2022",
			"is_child": true,
			"email": "lschade3@utexas.edu",
			"phone": "994-732-5873",
			"city": "Saint-Ouen",
			"address": "7532 Hauk Pass",
			"created_at": "09/05/2022",
			"type_id": 0,
			"customer_type": 1
		}, {
			"customer_id": 754670,
			"name": "Heidie",
			"last_name": "Debney",
			"date_birth": "26/07/2021",
			"is_child": false,
			"email": "hdebney4@omniture.com",
			"phone": "201-636-0493",
			"city": "Taipinghu",
			"address": "37 Steensland Pass",
			"created_at": "09/05/2022",
			"type_id": 2,
			"customer_type": 0
		}, {
			"customer_id": 314858,
			"name": "Richy",
			"last_name": "De Caroli",
			"date_birth": "05/03/2022",
			"is_child": true,
			"email": "rdecaroli5@livejournal.com",
			"phone": "367-317-1982",
			"city": "Seredka",
			"address": "6613 Del Mar Way",
			"created_at": "09/05/2022",
			"type_id": 1,
			"customer_type": 1
		}, {
			"customer_id": 246716,
			"name": "Stacee",
			"last_name": "Wisam",
			"date_birth": "22/05/2021",
			"is_child": false,
			"email": "swisam6@plala.or.jp",
			"phone": "987-654-7946",
			"city": "Ārt Khwājah",
			"address": "1 8th Place",
			"created_at": "09/05/2022",
			"type_id": 0,
			"customer_type": 0
		}, {
			"customer_id": 352757,
			"name": "Gwynne",
			"last_name": "Frowde",
			"date_birth": "11/06/2021",
			"is_child": false,
			"email": "gfrowde7@webmd.com",
			"phone": "173-758-3783",
			"city": "Opatówek",
			"address": "7 Badeau Way",
			"created_at": "09/05/2022",
			"type_id": 2,
			"customer_type": 1
		}, {
			"customer_id": 270937,
			"name": "Lazar",
			"last_name": "Rapinett",
			"date_birth": "10/06/2021",
			"is_child": true,
			"email": "lrapinett8@amazon.co.uk",
			"phone": "421-774-3878",
			"city": "Vilar",
			"address": "6 West Trail",
			"created_at": "09/05/2022",
			"type_id": 2,
			"customer_type": 1
		}, {
			"customer_id": 614830,
			"name": "Rachelle",
			"last_name": "Garrad",
			"date_birth": "30/11/2021",
			"is_child": true,
			"email": "rgarrad9@elegantthemes.com",
			"phone": "421-982-5127",
			"city": "Pasrūr",
			"address": "2 Florence Lane",
			"created_at": "09/05/2022",
			"type_id": 1,
			"customer_type": 1
		}]);
	},

	async down (queryInterface) {
		await queryInterface.bulkDelete(CUSTOMER_TABLE, null, {});
	}
};
