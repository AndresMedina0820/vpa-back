const { Model, DataTypes, Sequelize } = require('sequelize');
const { BOOKING_TABLE } = require('./bookingModel');
const {CUSTOMER_TABLE } = require('./customerModel')

const BOOKING_CUSTOMERS_TABLE = 'booking_customers';

const BookingCustomersSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER
	},
	bookingId: {
		allowNull: false,
		type: DataTypes.INTEGER,
		field: 'booking_id',
		references: {
			model: BOOKING_TABLE,
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
		this.belongsTo(models.Booking, {
			foreignKey: 'bookingId',
			as: 'booking'
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

