const restaurantCategoryModel = require('../../../lib/models/RestaurantCategory');
const {sequelize} = require('../../../lib/config/database');
const crudController = require('../../crud');

module.exports = crudController(restaurantCategoryModel , sequelize);