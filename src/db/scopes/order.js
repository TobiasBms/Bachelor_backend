module.exports = function applyScopes(sequelize) {
  const { OrderRating, OrderStatus, Order } = sequelize.models

  Order.addScope("rating", {
    include: [{ model: OrderRating, as: "rating" }],
  })

  Order.addScope("status", {
    include: [
      {
        model: OrderStatus,
        as: "status",
        through: { attributes: ["timeChanged"] },
      },
    ],
  })
}
