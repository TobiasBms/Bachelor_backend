module.exports = function applyAssociations(sequelize) {
  const {
    Restaurant,
    RestaurantHours,
    RestaurantCategory,
    RestaurantHasCategory,
    RestaurantSeat,
    City,
    Manager,
    File,
    RestaurantHasFile,
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
    foreignKey: "cityId",
  })

  Restaurant.belongsTo(City, {
    foreignKey: "cityId",
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

  Restaurant.belongsToMany(File, {
    through: RestaurantHasFile,
    foreignKey: "restaurantId",
    otherKey: "fileId",
    as: "files",
  })

  File.belongsToMany(Restaurant, {
    through: RestaurantHasFile,
    foreignKey: "fileId",
    otherKey: "restaurantId",
    as: "restaurants",
  })

  File.hasMany(RestaurantHasFile, {
    foreignKey: "fileId",
  })

  RestaurantHasFile.belongsTo(File, {
    foreignKey: "fileId",
  })
}
