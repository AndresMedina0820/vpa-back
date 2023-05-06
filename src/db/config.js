const { config } = require("../config/config");

// URL de Conexion
const URI = `postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

console.log(URI);

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
        rejectUnauthorized: true
      },
      encrypt: true
    }
	}
}
