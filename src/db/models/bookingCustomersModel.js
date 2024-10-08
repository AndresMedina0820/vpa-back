const { Model, DataTypes, Sequelize } = require('sequelize');
const { TRAVEL_TABLE } = require('./travelModel');
const {CUSTOMER_TABLE } = require('./customerModel')

const BOOKING_CUSTOMERS_TABLE = 'booking_customers';

const BookingCustomersSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER
	},
	travelId: {
		allowNull: false,
		type: DataTypes.INTEGER,
		field: 'travel_id',
		references: {
			model: TRAVEL_TABLE,
			key: 'id'
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL'
	},
	customerId: {
		allowNull: false,
		type: DataTypes.INTEGER,
		field: 'customer_id',
		references: {
			model: CUSTOMER_TABLE,
			key: 'id'
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL'
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: 'created_at',
		defaultValue: Sequelize.NOW
	},
	modifiedAt: {
		allowNull: true,
		type: DataTypes.DATE,
		field: 'modified_at',
	}
}

class BookingCustomers extends Model {
	static associate(models) {
		this.belongsTo(models.Travel, {
			foreignKey: 'travelId',
			as: 'travel'
		});
		this.belongsTo(models.Customer, {
			foreignKey: 'customerId',
			as: 'customer'
		});
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: BOOKING_CUSTOMERS_TABLE,
			modelName: 'BookingCustomers',
			timestamps: false
		}
	}
}

module.exports = { BookingCustomers, BOOKING_CUSTOMERS_TABLE, BookingCustomersSchema };

