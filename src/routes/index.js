const express = require('express');
const customersRouter = require('./customersRouter');
const usersRouter = require('./usersRouter');
const busesRouter = require('./busesRouter');
const pricesRouter = require('./pricesRouter');
const travelsRouter = require('./travelsRouter');
const webPageRouter = require('./webPage.router');
const bookingCustomersRouter = require('./bookingCustomersRouter');
const companionsXCustomersRouter = require('./companionsXCustomers');

// Settings
const travelsDestinationRouter = require('./settings/travelsDestinationRouter');
const busesCompanyRouter = require('./settings/busesCompanyRouter');
const pricesTypeRouter = require('./settings/pricesTypeRouter');
const typeIdRouter = require('./settings/typeIdRouter');
const typeCustomerRouter = require('./settings/typeCustomerRouter');
const rolesRouter = require('./settings/rolesRouter');

function routerApi(app) {
	const router = express.Router();
	app.use('/api/v1', router);
	router.use('/customers', customersRouter);
	router.use('/users', usersRouter);
	router.use('/buses', busesRouter);
	router.use('/travels', travelsRouter);
	router.use('/travels/', pricesRouter);
	router.use('/bookings/customers', bookingCustomersRouter);
	router.use('/bookings/customers/companions', companionsXCustomersRouter);
	router.use('/settings/travels/destinations', travelsDestinationRouter);
	router.use('/settings/buses/companies', busesCompanyRouter);
	router.use('/settings/types/prices', pricesTypeRouter);
	router.use('/settings/types/id', typeIdRouter);
	router.use('/settings/types/customers', typeCustomerRouter);
	router.use('/settings/roles', rolesRouter);
	router.use('/webpage/', webPageRouter);
}

module.exports = routerApi;
