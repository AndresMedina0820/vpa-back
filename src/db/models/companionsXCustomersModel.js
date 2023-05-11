const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customerModel');
const { PRICES_TABLE } = require('./pricesModel');

const COMPANIONS_X_CUSTOMERS_TABLE = 'companions_x_customers';

const CompanionsXCustomersSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER
	},
	customerId: {
		allowNull: false,
		type: DataTypes.INTEGER,
		field: 'customer_id',
		references: {
			model: CUSTOMER_TABLE,
			key: 'id'
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL'
	},
	companionId: {
		allowNull: false,
		type: DataTypes.INTEGER,
		field: 'companion_id',
		references: {
			model: CUSTOMER_TABLE,
			key: 'id'
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL'
	},
  priceId: {
		allowNull: true,
		type: DataTypes.INTEGER,
		field: 'price_id',
		references: {
			model: PRICES_TABLE,
			key: 'id'
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL'
	},
  isPaid: {
		allowNull: true,
		field: 'is_paid',
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
  outstandingBalance: {
		allowNull: true,
    field: 'outstanding_balance',
		type: DataTypes.INTEGER,
		defaultValue: 0
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

class CompanionsXCustomers extends Model {
	static associate(models) {
		this.belongsTo(models.Customer, {
			foreignKey: 'customerId',
			as: 'customer'
		});
    this.belongsTo(models.Customer, {
			foreignKey: 'companionId',
			as: 'companion'
		});
    this.belongsTo(models.Prices, {
			foreignKey: 'priceId',
			as: 'price'
		});
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: COMPANIONS_X_CUSTOMERS_TABLE,
			modelName: 'CompanionsXCustomers',
			timestamps: false
		}
	}
}

module.exports = { CompanionsXCustomers, COMPANIONS_X_CUSTOMERS_TABLE, CompanionsXCustomersSchema };

