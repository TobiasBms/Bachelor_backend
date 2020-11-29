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

  Order.hasMany(OrderHasProduct, {
    foreignKey: "orderId",
    as: "products",
  })

  OrderHasProduct.belongsTo(Order, {
    foreignKey: "orderId",
  })

  Product.hasMany(OrderHasProduct, {
    foreignKey: "productId",
  })

  OrderHasProduct.belongsTo(Product, {
    foreignKey: "productId",
    as: "product",
  })

  OrderHasProduct.hasMany(OrderHasProductHasExtra, {
    foreignKey: "orderproductId",
    as: "extras",
  })

  OrderHasProductHasExtra.belongsTo(OrderHasProduct, {
    foreignKey: "orderproductId",
  })

  Extra.hasMany(OrderHasProductHasExtra, {
    foreignKey: "extraId",
  })

  OrderHasProductHasExtra.belongsTo(Extra, {
    foreignKey: "extraId",
    as: "extra",
  })

  OrderRating.belongsTo(Restaurant, {
    foreignKey: "restaurantId",
  })

  Restaurant.hasMany(OrderRating, {
    foreignKey: "restaurantId",
  })

  OrderRating.belongsTo(Order, {
    foreignKey: "orderId",
    as: "order",
  })

  Order.hasOne(OrderRating, {
    foreignKey: "orderId",
    as: "rating",
  })
}
