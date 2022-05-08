require('dotenv').config();

const config = {
	env: process.env.NODE_ENV,
	port: process.env.PORT || '3004',
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbHost: process.env.DB_HOST,
	dbName: process.env.DB_NAME,
	dbPort: process.env.DB_PORT,
	dialect: process.env.DIALECT
};

module.exports = { config };
