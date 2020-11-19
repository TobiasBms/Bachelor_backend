const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("ProductHasExtra", {
    product_id: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Product,
        key: "id",
      },
    },
    extra_id: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Extra,
        key: "id",
      },
    },
  })
}
