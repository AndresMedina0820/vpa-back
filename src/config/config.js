require('dotenv').config();

const config = {
	env: process.env.CUSTOMCONNSTR_NODE_ENV || 'development',
	isProd: process.env.CUSTOMCONNSTR_NODE_ENV === 'production',
	port: process.env.PORT || '3005',
	dbUser: process.env.POSTGRESQLCONNSTR_DB_USER || process.env.DB_USER,
	dbPassword: process.env.POSTGRESQLCONNSTR_DB_PASSWORD || process.env.DB_PASSWORD,
	dbHost: process.env.POSTGRESQLCONNSTR_DB_HOST || process.env.DB_HOST,
	dbName: process.env.POSTGRESQLCONNSTR_DB_NAME || process.env.DB_NAME,
	dbPort: process.env.DB_PORT || 5432,
  // azureStorage: process.env.CUSTOMCONNSTR_AZURE_STORAGE_CONNECTION_STRING || process.env.AZURE_STORAGE_CONNECTION_STRING,
  azureStorageAccount: process.env.CUSTOMCONNSTR_AZURE_ACCOUNT || process.env.AZURE_ACCOUNT,
  azureStoragePassword: process.env.CUSTOMCONNSTR_AZURE_PASSWORD || process.env.AZURE_PASSWORD,
	// apiKey: process.env.API_KEY
};

module.exports = { config };
