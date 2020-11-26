const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  const { Restaurant } = sequelize.models
  sequelize.define("ProductCategory", {
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
    hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    available_start: {
      type: DataTypes.TIME,
      defaultValue: null,
    },
    available_end: {
      type: DataTypes.TIME,
      defaultValue: null,
    },
  })
}
