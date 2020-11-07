const { Sequelize } = require('sequelize');
const { modelDefinitions } = require('./models');
const { applyAssociations } = require('./assoc');
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB, process.env.USR, process.env.PASS, {
  host: process.env.HOST,
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