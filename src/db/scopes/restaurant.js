module.exports = function applyScopes(sequelize) {
  const {
    Restaurant,
    City,
    RestaurantCategory,
    RestaurantHours,
    File,
  } = sequelize.models

  // Include city and exclude zip_code
  Restaurant.addScope("city", {
    include: [{ model: City, as: "city" }],
    attributes: { exclude: ["cityId"] },
  })

  // Include list of restaurant categories
  Restaurant.addScope("categories", {
    include: [
      {
        model: RestaurantCategory,
        as: "categories",
        // Exclude attributes from the join table
        through: { attributes: [] },
      },
    ],
  })

  // Include list of restaurant categories
  Restaurant.addScope("files", {
    include: [
      {
        model: File,
        as: "files",
        // Exclude attributes from the join table
        through: { attributes: [] },
      },
    ],
  })

  // Include list of restaurant opening hours
  Restaurant.addScope("hours", {
    include: [
      {
        model: RestaurantHours,
        as: "hours",
        // Exclude restaurant_id from hours objects
        attributes: { exclude: ["restaurantId"] },
      },
    ],
  })
}
