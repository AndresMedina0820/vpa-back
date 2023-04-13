const { config } = require("../config/config");

// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);

// URL de Conexion
const URI = `postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
	development: {
		url: URI,
		dialect: 'postgres',
	},
	production: {
		url: URI,
		dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
	}
}
