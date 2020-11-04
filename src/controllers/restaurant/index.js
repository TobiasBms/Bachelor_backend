const restaurantModel = require('../../../lib/models/Restaurant');
const {sequelize} = require('../../../lib/config/database');
const crudController = require('../../crud');

module.exports = crudController(restaurantModel, sequelize);