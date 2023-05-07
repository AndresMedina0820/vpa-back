const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models');

// URL de Conexion
const URI = `postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const options = {
	dialect: 'postgres',
	logging: config.isProd ? true : false,
}

console.log("=======================is prod?", config.isProd)

if (config.isProd) {
	options.dialectOptions = {
		ssl: {
			rejectUnauthorized: true
		},
    encrypt: true
	}
}

const sequelize = new Sequelize(URI, options);

setupModels(sequelize);

module.exports = sequelize;
