const { Model, DataTypes, Sequelize } = require('sequelize');

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
	departureDate: {
		allowNull: false,
		type: DataTypes.DATE,
		field: 'departure_date'
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

class Travel extends Model {
	static associate() {
		// TODO Relations models
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: TRAVEL_TABLE,
			modelName: 'User',
			timestamps: false
		}
	}
}

module.exports = { Travel, TRAVEL_TABLE, TravelSchema };

