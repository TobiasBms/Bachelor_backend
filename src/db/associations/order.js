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
    otherKey: "status_id",
    foreignKey: "order_id",
    as: "status",
  })

  OrderStatus.belongsToMany(Order, {
    through: OrderHasStatus,
    otherKey: "order_id",
    foreignKey: "status_id",
  })

  RestaurantSeat.hasMany(Order, {
    foreignKey: "seat_id",
  })

  Order.belongsTo(RestaurantSeat, {
    foreignKey: "seat_id",
  })

  Restaurant.hasMany(Order, {
    foreignKey: "restaurant_id",
  })

  Order.belongsTo(Restaurant, {
    foreignKey: "restaurant_id",
  })

  Order.belongsToMany(Product, {
    through: OrderHasProduct,
    foreignKey: "order_id",
    otherKey: "product_id",
  })

  Product.belongsToMany(Order, {
    through: OrderHasProduct,
    foreignKey: "product_id",
    otherKey: "order_id",
  })

  OrderHasProduct.belongsToMany(Extra, {
    through: OrderHasProductHasExtra,
    foreignKey: "orderproduct_id",
    otherKey: "extra_id",
  })

  Extra.belongsToMany(OrderHasProduct, {
    through: OrderHasProductHasExtra,
    foreignKey: "extra_id",
    otherKey: "orderproduct_id",
  })

  OrderRating.hasMany(Restaurant, {
    foreignKey: "restaurant_id",
  })

  Restaurant.belongsTo(OrderRating, {
    foreignKey: "restaurant_id",
  })

  OrderRating.belongsTo(Order, {
    foreignKey: "order_id",
    as: "order",
  })

  Order.hasMany(OrderRating, {
    foreignKey: "order_id",
    as: "rating",
  })
}
