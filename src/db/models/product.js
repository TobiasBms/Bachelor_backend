const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  const { Restaurant } = sequelize.models
  sequelize.define("Product", {
    restaurant_id: {
      type: DataTypes.INTEGER,
      references: { model: Restaurant },
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    image_id: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    sold_out: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  })
}
