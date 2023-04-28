const { Model, DataTypes, Sequelize } = require('sequelize');
const { TYPE_ID_TABLE } = require('./typeIdModel');
const { CUSTOMER_TYPE_TABLE } = require('../models/customerTypeModel');
const { TRAVEL_TABLE } = require('../models/travelModel');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER
	},
	customerId: {
		allowNull: false,
		type: DataTypes.INTEGER,
		unique: true,
		field: 'customer_id'
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
	dateBirth: {
		allowNull: false,
		type: DataTypes.DATE,
    timestamps: true,
		field: 'date_birth'
	},
	isChild: {
		allowNull: false,
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		field: 'is_child'
	},
	email: {
		allowNull: true,
		type: DataTypes.STRING,
	},
	phone: {
		allowNull: true,
		type: DataTypes.STRING
	},
	city: {
		allowNull: true,
		type: DataTypes.STRING
	},
	address: {
		allowNull: true,
		type: DataTypes.STRING
	},
	customerType: {
		allowNull: false,
		type: DataTypes.INTEGER,
		field: 'customer_type',
		references: {
			model: CUSTOMER_TYPE_TABLE,
			key: 'id'
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL'
	},
	travelId: {
		allowNull: true,
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

class Customer extends Model {
	static associate(models) {
		this.belongsTo(models.TypeId, {
			foreignKey: 'typeId',
			as: 'type_id'
		});
		this.belongsTo(models.CustomerType, {
			foreignKey: 'customerType',
			as: 'customer_type'
		});
		this.belongsTo(models.Travel, {
			foreignKey: 'travelId',
			as: 'travel_id'
		});
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: CUSTOMER_TABLE,
			modelName: 'Customer',
			timestamps: false
		}
	}
}

module.exports = { Customer, CUSTOMER_TABLE, CustomerSchema };
