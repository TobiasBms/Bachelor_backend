module.exports = function applyAssociations(sequelize) {
  const {
    Restaurant,
    RestaurantHours,
    RestaurantCategory,
    RestaurantHasCategory,
    RestaurantSeat,
    City,
  } = sequelize.models;

  Restaurant.belongsToMany(RestaurantCategory, {
    through: RestaurantHasCategory,
    foreignKey: 'restaurant_id',
    otherKey: 'category_id',
    as: 'categories'
  });

  RestaurantCategory.belongsToMany(Restaurant, {
    through: RestaurantHasCategory,
    foreignKey: 'category_id',
    otherKey: 'restaurant_id',
    as: 'categories'
  });

  City.hasMany(Restaurant, {
    foreignKey: 'zip_code',
  });

  Restaurant.belongsTo(City, {
    foreignKey: 'zip_code',
    as: 'city'
  });

  Restaurant.hasMany(RestaurantHours, {
    foreignKey: 'restaurant_id',
    as: 'hours'
  });

  RestaurantHours.belongsTo(Restaurant, {
    foreignKey: 'restaurant_id',
  });

  Restaurant.hasMany(RestaurantSeat, {
    foreignKey: 'restaurant_id'
  });

  RestaurantSeat.belongsTo(Restaurant, {
    foreignKey: 'restaurant_id'
  });
};