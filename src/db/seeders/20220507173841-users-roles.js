'use strict';

const { USER_TABLE } = require('../models/userModel');
const { ROLE_TABLE } = require('../models/roleModel');

module.exports = {
	async up (queryInterface) {
		await queryInterface.bulkInsert(ROLE_TABLE, [{
			id: 1,
			name: 'Asesor'
		}, {
			id: 2,
			name: 'Programador'
		}, {
			id: 3,
			name: 'Administrador'
		}]);

		await queryInterface.bulkInsert(USER_TABLE, [{
			"user_id": 600483,
			"type_id": 1,
			"name": "Melodee",
			"last_name": "Ellif",
			"email": "mellif0@yellowbook.com",
			"password": "UJsNlp4E9vIk",
			"picture": "",
			"role": 3,
			"created_at": "02/03/2022"
		}, {
			"user_id": 887140,
			"type_id": 1,
			"name": "Hanan",
			"last_name": "Tebbutt",
			"email": "htebbutt1@alibaba.com",
			"password": "cYxn8Ty",
			"picture": "",
			"role": 1,
			"created_at": "02/03/2022"
		}, {
			"user_id": 49235,
			"type_id": 2,
			"name": "Filberte",
			"last_name": "Matkovic",
			"email": "fmatkovic2@hp.com",
			"password": "EkfYJjOrYT8",
			"picture": "",
			"role": 2,
			"created_at": "05/04/2022"
		}, {
			"user_id": 287101,
			"type_id": 1,
			"name": "Angus",
			"last_name": "Lardier",
			"email": "alardier3@imgur.com",
			"password": "hoqSqGHKh",
			"picture": "",
			"role": 1,
			"created_at": "04/07/2021"
		}, {
			"user_id": 60604,
			"type_id": 2,
			"name": "Enoch",
			"last_name": "Baggarley",
			"email": "ebaggarley4@engadget.com",
			"password": "foeVLuXsNeH",
			"picture": "",
			"role": 1,
			"created_at": "11/06/2021"
		}, {
			"user_id": 960867,
			"type_id": 1,
			"name": "Thaddus",
			"last_name": "Spellesy",
			"email": "tspellesy5@google.com.hk",
			"password": "PJi0cK18Rb",
			"picture": "",
			"role": 1,
			"created_at": "04/01/2022"
		}, {
			"user_id": 971953,
			"type_id": 1,
			"name": "Lanita",
			"last_name": "Delbergue",
			"email": "ldelbergue6@bing.com",
			"password": "r338PMw",
			"picture": "",
			"role": 2,
			"created_at": "06/02/2022"
		}, {
			"user_id": 321585,
			"type_id": 1,
			"name": "Ekaterina",
			"last_name": "Mullard",
			"email": "emullard7@bloglines.com",
			"password": "9DLRty61Al9q",
			"picture": "",
			"role": 1,
			"created_at": "02/03/2022"
		}, {
			"user_id": 159018,
			"type_id": 2,
			"name": "Atlanta",
			"last_name": "Van der Krui",
			"email": "avanderkrui8@imageshack.us",
			"password": "uDMrBGYnQoIO",
			"picture": "",
			"role": 1,
			"created_at": "02/03/2022"
		}, {
			"user_id": 649979,
			"type_id": 2,
			"name": "Gnni",
			"last_name": "Brosius",
			"email": "gbrosius9@slashdot.org",
			"password": "Ow9TlQ",
			"picture": "",
			"role": 2,
			"created_at": "02/03/2022"
		}]);
	},

	async down (queryInterface) {
		await queryInterface.bulkDelete(USER_TABLE, null, {});
		await queryInterface.bulkDelete(ROLE_TABLE, null, {});
	}
};
