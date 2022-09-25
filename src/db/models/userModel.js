const { Model, DataTypes, Sequelize } = require('sequelize');
const { TYPE_ID_TABLE } = require('./typeIdModel');
const { ROLE_TABLE } = require('./roleModel');

const USER_TABLE = 'users';

const UserSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER
	},
	userId: {
		allowNull: false,
		type: DataTypes.INTEGER,
		unique: true,
		field: 'user_id'
	},
	typeId: {
		allowNull: false,
		type: DataTypes.INTEGER,
		field: 'type_id',
		references: {
			model: TYPE_ID_TABLE,
			key: 'id'
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL'
	},
	name: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	lastName: {
		allowNull: false,
		type: DataTypes.STRING,
		field: 'last_name'
	},
	email: {
		allowNull: true,
		type: DataTypes.STRING,
	},
	password: {
		allowNull: false,
		type: DataTypes.STRING
	},
	picture: {
		allowNull: true,
		type: DataTypes.BLOB
	},
	roleId: {
		allowNull: false,
		type: DataTypes.INTEGER,
		field: 'role',
		references: {
			model: ROLE_TABLE,
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

class User extends Model {
	static associate(models) {
		this.belongsTo(models.TypeId, {
			foreignKey: 'typeId',
			as: 'type_id'
		});
		this.belongsTo(models.Role, {
			foreignKey: 'roleId',
			as: 'role'
		});
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

module.exports = { User, USER_TABLE, UserSchema };
