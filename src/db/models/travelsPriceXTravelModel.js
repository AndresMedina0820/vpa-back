const { Model, DataTypes, Sequelize } = require('sequelize');
const { PRICES_TABLE, Prices } = require('./pricesModel');
const { TRAVEL_TABLE, Travel } = require('./travelModel');

const TRAVELS_PRICESXTRAVEL_TABLE = 'travels_pricextravel';

const TravelsPriceXTravelSchema = {
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
	priceId: {
		allowNull: false,
		type: DataTypes.INTEGER,
		field: 'price_id',
		references: {
			model: PRICES_TABLE,
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
		defaultValue: Sequelize.NOW
	}
}

class TravelsPriceXTravel extends Model {
	static associate() {
		// TODO Relations models
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: USER_TABLE,
			modelName: 'User',
			timestamps: false
		}
	}
}

module.exports = { TravelsPriceXTravel, TRAVELS_PRICESXTRAVEL_TABLE, TravelsPriceXTravelSchema };
