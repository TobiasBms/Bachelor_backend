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
    foreignKey: "restaurant_id",
  })

  Product.belongsTo(Restaurant, {
    foreignKey: "restaurant_id",
  })

  Restaurant.hasMany(Extra, {
    foreignKey: "restaurant_id",
  })

  Extra.belongsTo(Restaurant, {
    foreignKey: "restaurant_id",
  })

  Extra.belongsToMany(Product, {
    through: ProductHasExtra,
    foreignKey: "extra_id",
    otherKey: "product_id",
    as: "extra",
  })

  Product.belongsToMany(Extra, {
    through: ProductHasExtra,
    foreignKey: "product_id",
    otherKey: "extra_id",
    as: "extra",
  })

  Product.belongsToMany(ProductCategory, {
    through: ProductHasCategory,
    foreignKey: "category_id",
    otherKey: "product_id",
<<<<<<< HEAD
    as: "categories",
=======
    as: "productCategory",
>>>>>>> master
  })

  ProductCategory.belongsToMany(Product, {
    through: ProductHasCategory,
    foreignKey: "product_id",
    otherKey: "category_id",
    as: "product",
  })
}
