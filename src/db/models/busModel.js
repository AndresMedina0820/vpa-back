const { Model, DataTypes, Sequelize } = require('sequelize');
const { COMPANY_TABLE } = require('./busCompanyModel');

const BUS_TABLE = 'buses';

const BusSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER
	},
	licensePlate: {
		allowNull: false,
		type: DataTypes.STRING,
		unique: true,
		field: 'license_plate'
	},
	capacity: {
		allowNull: false,
		type: DataTypes.INTEGER,
		defaultValue: 0
	},
	companyId: {
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: COMPANY_TABLE
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

class Bus extends Model {
	static associate(models) {
		this.belongsTo(models.Company, {
			foreignKey: 'companyId',
			as: 'company'
		})
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: BUS_TABLE,
			modelName: 'Bus',
			timestamps: false
		}
	}
}

module.exports = { Bus, BUS_TABLE, BusSchema };

