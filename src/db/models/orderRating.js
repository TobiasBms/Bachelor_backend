const { DataTypes, Sequelize } = require("sequelize")

module.exports = sequelize => {
  const { Order, Restaurant } = sequelize.models
  sequelize.define("OrderRating", {
    order_id: {
      type: DataTypes.INTEGER,
      references: { model: Order },
      unique: true,
      onDelete: "SET NULL",
      onUpdate: "RESTRICT",
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      references: { model: Restaurant },
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
    name: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    review: {
      type: DataTypes.TEXT,
    },
    rated_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  })
}
