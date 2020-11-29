const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  const { Restaurant } = sequelize.models
  sequelize.define("ProductCategory", {
    restaurantId: {
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
    hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    availableStart: {
      type: DataTypes.TIME,
      defaultValue: null,
    },
    availableEnd: {
      type: DataTypes.TIME,
      defaultValue: null,
    },
  })
}
