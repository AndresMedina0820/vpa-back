const { Customer, CustomerSchema } = require('./customerModel');
const { User, UserSchema } = require('./userModel');
const { Bus, BusSchema } = require('./busModel');
const { Company, CompanySchema } = require('./busCompanyModel');
const { TypeId, TypeIdSchema } = require('./typeIdModel');
const { CustomerType, CustomerTypeSchema } = require('./customerTypeModel');
const { Role, RoleSchema } = require('./roleModel');
const { TravelsDestination, TravelsDestinationSchema } = require('./travelsDestinationModel');
const { PricesType, PricesTypeSchema } = require('./pricesTypeModel');
const { Prices, PricesSchema } = require('./pricesModel');
const { Travel, TravelSchema } = require('./travelModel');
const { Booking, BookingSchema } = require('./bookingModel');

function setupModels(sequelize_connection) {
	// Initials
	TravelsDestination.init(TravelsDestinationSchema, TravelsDestination.config(sequelize_connection));
	Role.init(RoleSchema, Role.config(sequelize_connection));
	Company.init(CompanySchema, Company.config(sequelize_connection));
	TypeId.init(TypeIdSchema, TypeId.config(sequelize_connection));
	CustomerType.init(CustomerTypeSchema, CustomerType.config(sequelize_connection));
	Customer.init(CustomerSchema, Customer.config(sequelize_connection));
	User.init(UserSchema, User.config(sequelize_connection));
	Bus.init(BusSchema, Bus.config(sequelize_connection));
	PricesType.init(PricesTypeSchema, PricesType.config(sequelize_connection));
	Travel.init(TravelSchema, Travel.config(sequelize_connection));
	Prices.init(PricesSchema, Prices.config(sequelize_connection));
	Booking.init(BookingSchema, Booking.config(sequelize_connection));

	// Associations
	Customer.associate(sequelize_connection.models);
	User.associate(sequelize_connection.models);
	Bus.associate(sequelize_connection.models);
	Travel.associate(sequelize_connection.models);
	Prices.associate(sequelize_connection.models);
	Booking.associate(sequelize_connection.models);
}

module.exports = setupModels;
