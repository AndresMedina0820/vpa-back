const { Model, DataTypes, Sequelize } = require('sequelize');
const { TRAVELS_DESTINATION_TABLE, TravelsDestination } = require ('./travelsDestinationModel');
const { BUS_TABLE, Bus } = require ('./busModel');
const { PRICES_TABLE, Prices } = require ('./pricesModel');
const { TravelsPriceXTravel } = require('./travelsPriceXTravelModel');

const TRAVEL_TABLE = 'travels';

const TravelSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER
	},
	name: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	destinationId: {
		allowNull: false,
		type: DataTypes.INTEGER,
		field: 'destination_id',
		references: {
			model: TRAVELS_DESTINATION_TABLE,
			key: 'id'
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL'
	},
	departureDate: {
		allowNull: false,
		type: DataTypes.DATE,
		field: 'departure_date'
	},
	busId : {
		allowNull: false,
		type: DataTypes.INTEGER,
		field: 'bus_id',
		references: {
			model: BUS_TABLE
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL'
	},
	departureLocation: {
		allowNull: false,
		type: DataTypes.STRING,
		field: 'departure_location',
	},
	observations: {
		allowNull: true,
		type: DataTypes.STRING,
	},
	picture: {
		allowNull: true,
		type: DataTypes.BLOB
	},
	// priceId: {
	// 	allowNull: false,
	// 	type: DataTypes.INTEGER,
	// 	field: 'price_id',
	// 	references: {
	// 		model: `PRICES_TABLE`
	// 	},
	// 	onUpdate: 'CASCADE',
	// 	onDelete: 'SET NULL'
	// },
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

class Travel extends Model {
	static associate() {
		this.belongsTo(TravelsDestination, {
			foreignKey: 'destinationId',
			as: 'destination_id'
		});
		this.belongsTo(Bus, {
			foreignKey: 'busId',
			as: 'bus_id'
		});
		this.belongsToMany(Prices, {
			as: 'prices',
			through: TravelsPriceXTravel,
			foreignKey: 'travelId',
			otherKey: 'priceId'
		});
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: TRAVEL_TABLE,
			modelName: 'Travel',
			timestamps: false
		}
	}
}

module.exports = { Travel, TRAVEL_TABLE, TravelSchema };

