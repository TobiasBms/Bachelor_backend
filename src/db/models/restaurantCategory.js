const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('RestaurantCategory', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  })
}
