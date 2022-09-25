const { Model, DataTypes, Sequelize } = require('sequelize');
const { PRICES_TYPE_TABLE } = require('./pricesTypeModel');
const { TRAVEL_TABLE } = require('./travelModel');

const PRICES_TABLE = 'prices';

const PricesSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER
	},
	priceTypeId: {
		allowNull: false,
		type: DataTypes.INTEGER,
		field: 'price_type_id',
		references: {
			model: PRICES_TYPE_TABLE,
			key: 'id'
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL'
	},
	travelId: {
		allowNull: false,
		type: DataTypes.INTEGER,
		field: 'travel_id',
		references: {
			model: TRAVEL_TABLE,
			key: 'id'
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL'
	},
	value: {
		allowNull: true,
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
		defaultValue: Sequelize.NOW
	}
}

class Prices extends Model {
	static associate(models) {
		this.belongsTo(models.PricesType, {
			foreignKey: 'priceTypeId',
			as: 'price_type'
		});
		this.belongsTo(models.Travel, {
			as: 'travel'
		});
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: PRICES_TABLE,
			modelName: 'Prices',
			timestamps: false
		}
	}
}

module.exports = { Prices, PRICES_TABLE, PricesSchema };
