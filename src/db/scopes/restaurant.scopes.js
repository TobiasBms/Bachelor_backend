function applyScopes(sequelize) {
  const {
    Restaurant,
    City,
    RestaurantCategory,
    RestaurantHours,
  } = sequelize.models

  Restaurant.addScope('city', {
    include: [{ model: City, as: 'city' }],
    attributes: { exclude: ['zip_code'] },
  })

  Restaurant.addScope('categories', {
    include: [
      {
        model: RestaurantCategory,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  })

  Restaurant.addScope('hours', {
    include: [
      {
        model: RestaurantHours,
        as: 'hours',
        attributes: { exclude: ['restaurant_id'] },
      },
    ],
  })
}

module.exports = { applyScopes }
