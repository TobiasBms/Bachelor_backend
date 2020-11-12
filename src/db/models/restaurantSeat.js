const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('RestaurantSeat', {
    restaurant_id: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Restaurant,
        key: 'id'
      }
    },
    name: DataTypes.STRING,
  });
};