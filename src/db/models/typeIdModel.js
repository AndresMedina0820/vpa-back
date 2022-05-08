const { Model, DataTypes } = require('sequelize');

const TYPE_ID_TABLE = 'types_id';

const TypeIdSchema = {
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

class TypeId extends Model {
	static associate() {
		// TODO Relations models
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: TYPE_ID_TABLE,
			modelName: 'TypeId',
			timestamps: false
		}
	}
}

module.exports = { TypeId, TYPE_ID_TABLE, TypeIdSchema };
