const { Model, DataTypes, Sequelize } = require('sequelize');
const { TRAVEL_TABLE } = require ('./travelModel');

const BOOKING_TABLE = 'booking';

const BookingSchema = {
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

class Booking extends Model {
	static associate(models) {
		this.belongsTo(models.Travel, {
			foreignKey: 'travelId',
			as: 'travel'
		});
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: BOOKING_TABLE,
			modelName: 'Booking',
			timestamps: false
		}
	}
}

module.exports = { Booking, BOOKING_TABLE, BookingSchema };

