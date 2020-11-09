const { Sequelize } = require('sequelize');
const { modelDefinitions } = require('./models');
const { applyAssociations } = require('./associations');
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 3,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: console.log,
  define: {
    timestamps: false,
    underscored: true,
    freezeTableName: true
  }
});

for (const defineModel of modelDefinitions) {
  defineModel(sequelize);
}

applyAssociations(sequelize);
module.exports = sequelize;