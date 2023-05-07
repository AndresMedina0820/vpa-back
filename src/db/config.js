const { config } = require('../config/config');

// URL de Conexion
const URI = `postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

let options = {};

if (config.isProd) {
  options = {
    url: URI,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
      },
      encrypt: true,
    },
  };
} else {
  options = {
    url: URI,
    dialect: 'postgres',
  };
}

module.exports = { ...options };
