const express = require('express');
const customersRouter = require('./customersRouter');
const usersRouter = require('./usersRouter');
const busesRouter = require('./busesRouter');

function routerApi(app) {
	const router = express.Router();
	app.use('/api/v1', router);
	router.use('/customers', customersRouter);
	router.use('/users', usersRouter);
	router.use('/buses', busesRouter);
}

module.exports = routerApi;
