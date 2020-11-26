module.exports = function applyScopes(sequelize) {
  const {
    Order,
    OrderRating,
    OrderStatus,
    OrderHasProduct,
    Product,
    OrderHasProductHasExtra,
    Extra,
  } = sequelize.models

  /* Include the rating */
  Order.addScope("rating", {
    include: [
      {
        model: OrderRating,
        as: "rating",
        attributes: {
          /* Order already includes order and restaurant ID */
          exclude: ["order_id", "restaurant_id"],
        },
      },
    ],
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
        model: OrderHasProduct,
        as: "products",
        attributes: ["amount"],
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["id", "name", "price"],
          },
          {
            model: OrderHasProductHasExtra,
            as: "extras",
            attributes: ["amount"],
            include: [
              {
                model: Extra,
                as: "extra",
                attributes: ["id", "name", "price"],
              },
            ],
          },
        ],
      },
    ],
  })
}
