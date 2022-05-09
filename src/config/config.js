// require('dotenv').config();

const config = {
	env: 'development',
	port: process.env.PORT || '3004',
	dbUser: 'vwuqzhnagweuzd',
	dbPassword: '9dfa5a87ecf4bcb34980acccb9b4faa95dd8fb504cb906086100de666764d983',
	dbHost: 'ec2-35-168-194-15.compute-1.amazonaws.com',
	dbName: 'd56jfhhmcrabtu',
	dbPort: 5432,
	dialect: 'postgres'
};

module.exports = { config };
