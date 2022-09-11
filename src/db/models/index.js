const { Customer, CustomerSchema } = require('./customerModel');
const { User, UserSchema } = require('./userModel');
const { Bus, BusSchema } = require('./busModel');
const { Company, CompanySchema } = require('./companyModel');
const { TypeId, TypeIdSchema } = require('./typeIdModel');
const { CustomerType, CustomerTypeSchema } = require('./customerTypeModel');
const { Role, RoleSchema } = require('./roleModel');
const { TravelsDestination, TravelsDestinationSchema } = require('./travelsDestinationModel');
const { PricesType, PricesTypeSchema } = require('./pricesTypeModel');
const { Prices, PricesSchema } = require('./pricesModel');
const { Travel, TravelSchema } = require('./travelModel');
const { TravelsPriceXTravel, TravelsPriceXTravelSchema } = require('./travelsPriceXTravelModel');

function setupModels(sequelize_connection) {
	// Initials
	Role.init(RoleSchema, Role.config(sequelize_connection));
	Company.init(CompanySchema, Company.config(sequelize_connection));
	TypeId.init(TypeIdSchema, TypeId.config(sequelize_connection));
	CustomerType.init(CustomerTypeSchema, CustomerType.config(sequelize_connection));
	Customer.init(CustomerSchema, Customer.config(sequelize_connection));
	User.init(UserSchema, User.config(sequelize_connection));
	Bus.init(BusSchema, Bus.config(sequelize_connection));
	TravelsDestination.init(TravelsDestinationSchema, TravelsDestination.config(sequelize_connection));
	PricesType.init(PricesTypeSchema, PricesType.config(sequelize_connection));
	Prices.init(PricesSchema, Prices.config(sequelize_connection));
	Travel.init(TravelSchema, Travel.config(sequelize_connection));
	TravelsPriceXTravel.init(TravelsPriceXTravelSchema, TravelsPriceXTravel.config(sequelize_connection));

	// Associations
	Customer.associate();
	User.associate();
	Bus.associate();
	Prices.associate();
	Travel.associate();
}

module.exports = setupModels;
