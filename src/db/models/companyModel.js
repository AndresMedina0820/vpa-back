const { Model, DataTypes } = require('sequelize');

const COMPANY_TABLE = 'companies';

const CompanySchema = {
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

class Company extends Model {
	static associate() {
		// TODO Relations models
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: COMPANY_TABLE,
			modelName: 'User',
			timestamps: false
		}
	}
}

module.exports = { Company, COMPANY_TABLE, CompanySchema };
