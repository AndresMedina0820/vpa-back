const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

/**
 * @var URI is url for connection to db
 */
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const URI = `postgres://vwuqzhnagweuzd:9dfa5a87ecf4bcb34980acccb9b4faa95dd8fb504cb906086100de666764d983@ec2-35-168-194-15.compute-1.amazonaws.com:5432/d56jfhhmcrabtu`;

const sequelize = new Sequelize(URI, {
	dialect: config.dialect,
	logging: true
});

setupModels(sequelize);

module.exports = sequelize;
