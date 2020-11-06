function applyAssociations(sequelize) {
  const {
    Restaurant,
    RestaurantCategory,
    RestaurantHasCategory,
    City
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
  })
  Restaurant.belongsTo(City, {
    foreignKey: 'zip_code',
    as: 'city'
  })
}

module.exports = { applyAssociations };