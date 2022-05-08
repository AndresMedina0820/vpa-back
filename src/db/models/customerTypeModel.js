const { Model, DataTypes } = require('sequelize');

const CUSTOMER_TYPE_TABLE = 'customer_types';

const CustomerTypeSchema = {
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

class CustomerType extends Model {
	static associate() {
		// TODO Relations models
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: CUSTOMER_TYPE_TABLE,
			modelName: 'CustomerType',
			timestamps: false
		}
	}
}

module.exports = { CustomerType, CUSTOMER_TYPE_TABLE, CustomerTypeSchema };
