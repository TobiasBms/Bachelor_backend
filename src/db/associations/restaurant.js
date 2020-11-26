module.exports = function applyAssociations(sequelize) {
  const {
    Restaurant,
    RestaurantHours,
    RestaurantCategory,
    RestaurantHasCategory,
    RestaurantSeat,
    City,
    Manager,
  } = sequelize.models

  Restaurant.belongsToMany(RestaurantCategory, {
    through: RestaurantHasCategory,
    foreignKey: "restaurantId",
    otherKey: "categoryId",
    as: "categories",
  })

  RestaurantCategory.belongsToMany(Restaurant, {
    through: RestaurantHasCategory,
    foreignKey: "categoryId",
    otherKey: "restaurantId",
    as: "restaurants",
  })

  City.hasMany(Restaurant, {
    foreignKey: "zipCode",
  })

  Restaurant.belongsTo(City, {
    foreignKey: "zipCode",
    as: "city",
  })

  Restaurant.hasMany(RestaurantHours, {
    foreignKey: "restaurantId",
    as: "hours",
  })

  RestaurantHours.belongsTo(Restaurant, {
    foreignKey: "restaurantId",
  })

  Restaurant.hasMany(RestaurantSeat, {
    foreignKey: "restaurantId",
  })

  RestaurantSeat.belongsTo(Restaurant, {
    foreignKey: "restaurantId",
  })

  Restaurant.hasMany(Manager, {
    foreignKey: "restaurantId",
  })

  Manager.belongsTo(Restaurant, {
    foreignKey: "restaurantId",
  })
}
