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

  Order.hasMany(OrderHasProduct, {
    foreignKey: "order_id",
    as: "products",
  })

  OrderHasProduct.belongsTo(Order, {
    foreignKey: "order_id",
  })

  Product.hasMany(OrderHasProduct, {
    foreignKey: "product_id",
  })

  OrderHasProduct.belongsTo(Product, {
    foreignKey: "product_id",
    as: "product",
  })

  OrderHasProduct.hasMany(OrderHasProductHasExtra, {
    foreignKey: "orderproduct_id",
    as: "extras",
  })

  OrderHasProductHasExtra.belongsTo(OrderHasProduct, {
    foreignKey: "orderproduct_id",
  })

  Extra.hasMany(OrderHasProductHasExtra, {
    foreignKey: "extra_id",
  })

  OrderHasProductHasExtra.belongsTo(Extra, {
    foreignKey: "extra_id",
    as: "extra",
  })

  OrderRating.belongsTo(Restaurant, {
    foreignKey: "restaurant_id",
  })

  Restaurant.hasMany(OrderRating, {
    foreignKey: "restaurant_id",
  })

  OrderRating.belongsTo(Order, {
    foreignKey: "order_id",
    as: "order",
  })

  Order.hasOne(OrderRating, {
    foreignKey: "order_id",
    as: "rating",
  })
}
