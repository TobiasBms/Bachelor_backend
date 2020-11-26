module.exports = function applyAssociations(sequelize) {
  const {
    Restaurant,
    Product,
    Extra,
    ProductHasExtra,
    ProductCategory,
    ProductHasCategory,
  } = sequelize.models

  Restaurant.hasMany(Product, {
    foreignKey: "restaurantId",
  })

  Product.belongsTo(Restaurant, {
    foreignKey: "restaurantId",
  })

  Restaurant.hasMany(Extra, {
    foreignKey: "restaurantId",
  })

  Extra.belongsTo(Restaurant, {
    foreignKey: "restaurantId",
  })

  Extra.belongsToMany(Product, {
    through: ProductHasExtra,
    foreignKey: "extraId",
    otherKey: "productId",
    as: "extra",
  })

  Product.belongsToMany(Extra, {
    through: ProductHasExtra,
    foreignKey: "productId",
    otherKey: "extraId",
    as: "extra",
  })

  Product.belongsToMany(ProductCategory, {
    through: ProductHasCategory,
    foreignKey: "categoryId",
    otherKey: "productId",
    as: "categories",
  })

  ProductCategory.belongsToMany(Product, {
    through: ProductHasCategory,
    foreignKey: "productId",
    otherKey: "categoryId",
    as: "product",
  })
}
