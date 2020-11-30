module.exports = function applyScopes(sequelize) {
  const { File, RestaurantHasFile } = sequelize.models

  File.addScope("defaultScope", {
    include: [
      {
        model: RestaurantHasFile,
        as: "data",
        attributes: { exclude: ["fileId"] },
      },
    ],
  })

  File.addScope("forRestaurant", restaurantId => ({
    include: [
      {
        model: RestaurantHasFile,
        as: "data",
        attributes: [],
        where: { restaurantId },
      },
    ],
  }))
}
