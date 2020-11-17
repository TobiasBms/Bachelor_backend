module.exports = function applyScopes(sequelize) {
  const { Restaurant, RestaurantCategory } = sequelize.models

  // Include city and exclude zip_code
  RestaurantCategory.addScope('restaurants', {
    include: [
      { model: Restaurant, as: 'restaurants', through: { attributes: [] } },
    ],
  })
}
