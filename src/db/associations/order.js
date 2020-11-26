module.exports = function applyAssociations(sequelize) {
  const {
    Restaurant,
    RestaurantSeat,
    Product,
    Extra,
    Order,
    OrderStatus,
    OrderHasStatus,
    OrderHasProduct,
    OrderHasProductHasExtra,
    OrderRating,
  } = sequelize.models

  Order.belongsToMany(OrderStatus, {
    through: OrderHasStatus,
    otherKey: "statusId",
    foreignKey: "orderId",
    as: "status",
  })

  OrderStatus.belongsToMany(Order, {
    through: OrderHasStatus,
    otherKey: "orderId",
    foreignKey: "statusId",
  })

  RestaurantSeat.hasMany(Order, {
    foreignKey: "seatId",
  })

  Order.belongsTo(RestaurantSeat, {
    foreignKey: "seatId",
  })

  Restaurant.hasMany(Order, {
    foreignKey: "restaurantId",
  })

  Order.belongsTo(Restaurant, {
    foreignKey: "restaurantId",
  })

  Order.belongsToMany(Product, {
    through: OrderHasProduct,
    foreignKey: "orderId",
    otherKey: "productId",
  })

  Product.belongsToMany(Order, {
    through: OrderHasProduct,
    foreignKey: "productId",
    otherKey: "orderId",
  })

  OrderHasProduct.belongsToMany(Extra, {
    through: OrderHasProductHasExtra,
    foreignKey: "orderproductId",
    otherKey: "extraId",
  })

  Extra.belongsToMany(OrderHasProduct, {
    through: OrderHasProductHasExtra,
    foreignKey: "extraId",
    otherKey: "orderproductId",
  })

  OrderRating.hasMany(Restaurant, {
    foreignKey: "restaurantId",
  })

  Restaurant.belongsTo(OrderRating, {
    foreignKey: "restaurantId",
  })

  OrderRating.belongsTo(Order, {
    foreignKey: "orderId",
    as: "order",
  })

  Order.hasMany(OrderRating, {
    foreignKey: "orderId",
    as: "rating",
  })
}
