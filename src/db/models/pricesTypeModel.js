const { Model, DataTypes } = require('sequelize');

const PRICES_TYPE_TABLE = 'prices_type';

const PricesTypeSchema = {
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
	seatAvailable: {
		allowNull: false,
		field: 'seat_available',
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
}

class PricesType extends Model {
	static associate() {
		// TODO Relations models
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: PRICES_TYPE_TABLE,
			modelName: 'PricesType',
			timestamps: false
		}
	}
}

module.exports = { PricesType, PRICES_TYPE_TABLE, PricesTypeSchema };
