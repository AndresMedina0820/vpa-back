const { Model, DataTypes } = require('sequelize');

const ROLE_TABLE = 'roles';

const RoleSchema = {
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

class Role extends Model {
	static associate() {
		// TODO Relations models
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: ROLE_TABLE,
			modelName: 'Role',
			timestamps: false
		}
	}
}

module.exports = { Role, ROLE_TABLE, RoleSchema };
