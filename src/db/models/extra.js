const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  const { Restaurant } = sequelize.models
  sequelize.define("Extra", {
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
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    sold_out: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  })
}
