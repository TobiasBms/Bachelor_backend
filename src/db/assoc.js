function applyAssociations(sequelize) {
  const {
    Restaurant,
    RestaurantHours,
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

  Restaurant.hasMany(RestaurantHours,  {
    foreignKey: 'restaurant_id',
  })

  RestaurantHours.belongsTo(Restaurant, {
    foreignKey: 'restaurant_id',
  })

}



module.exports = { applyAssociations };