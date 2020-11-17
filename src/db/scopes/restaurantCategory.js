module.exports = function applyScopes(sequelize) {
  const { Restaurant, RestaurantCategory } = sequelize.models

  // Include list of restaurants
  RestaurantCategory.addScope('restaurants', {
    include: [
      { model: Restaurant, as: 'restaurants', through: { attributes: [] } },
    ],
  })
}
