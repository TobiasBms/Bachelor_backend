module.exports = function applyScopes(sequelize) {
  const { Product, ProductCategory } = sequelize.models

  ProductCategory.addScope("products", {
    include: [{ model: Product, as: "products", through: { attributes: [] } }],
  })
}
