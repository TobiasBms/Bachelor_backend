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

  /*
   * Include list of products and extras
   * To be able to include OrderHasProductHasExtra through OrderHasProduct,
   * these relations are treated by Sequelize as one-to-one, instead of
   * many-to-many as would be normal.
   */
  Order.addScope("products", {
    include: [
      {
        /* Include join table explicitly to gain access to extras */
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
            /*
             * Join table on extras is also included explicitly for a
             * more consistent data structure
             */
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
