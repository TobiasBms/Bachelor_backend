module.exports = function applyScopes(sequelize) {
  const { Product, ProductCategory, Extra } = sequelize.models

  Product.addScope("categories", {
    include: [
      { model: ProductCategory, as: "categories", through: { attributes: [] } },
    ],
  })

  Product.addScope("extra", {
    include: [{ model: Extra, as: "extra" }],
  })
}
