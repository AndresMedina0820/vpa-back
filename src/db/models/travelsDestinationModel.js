const { Model, DataTypes } = require('sequelize');

const TRAVELS_DESTINATION_TABLE = 'travels_destination';

const TravelsDestinationSchema = {
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
}

class TravelsDestination extends Model {
	static associate() {
		// TODO Relations models
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: TRAVEL_DESTINATION_TABLE,
			modelName: 'TravelsDestination',
			timestamps: false
		}
	}
}

module.exports = { TravelsDestination, TRAVELS_DESTINATION_TABLE, TravelsDestinationSchema };
