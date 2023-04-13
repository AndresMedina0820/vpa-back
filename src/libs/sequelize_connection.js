const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

// URL de Conexion
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const options = {
	dialect: 'postgres',
	logging: config.isProd ? true : false,
}

console.log("=======================is prod?", config.isProd)

if (config.isProd) {
	options.dialectOptions = {
		ssl: {
			rejectUnauthorized: false
		}
	}
}

console.log("==========================================options",options)
console.log("==========================================dbUrl", URI)

const sequelize = new Sequelize(URI, options);

setupModels(sequelize);

module.exports = sequelize;
