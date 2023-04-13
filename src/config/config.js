require('dotenv').config();

console.log("...............PROCESSSS ENVVV...............", process.env);

const config = {
	env: process.env.NODE_ENV || 'development',
	isProd: process.env.NODE_ENV === 'production',
	port: process.env.PORT || '3005',
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbHost: process.env.DB_HOST,
	dbName: process.env.DB_NAME,
	dbPort: process.env.DB_PORT,
	// dbUrl: process.env.DB_URL,
  azureStorage: process.env.AZURE_STORAGE_CONNECTION_STRING,
	// apiKey: process.env.API_KEY
};

console.log("...............ENV...............", config);

module.exports = { config };
