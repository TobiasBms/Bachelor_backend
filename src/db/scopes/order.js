module.exports = function applyScopes(sequelize) {
  const { OrderRating, OrderStatus, Order, Product } = sequelize.models

  Order.addScope("rating", {
    include: [{ model: OrderRating, as: "rating" }],
  })

  Order.addScope("status", {
    include: [
      {
        model: OrderStatus,
        as: "status",
        through: { attributes: ["time_changed"] },
      },
    ],
  })

  /* Include list of products */
  Order.addScope("products", {
    include: [
      {
        model: Product,
        as: "products",
        /* Exclude attributes from the join table */
        through: { attributes: [] },
      },
    ],
  })
}
