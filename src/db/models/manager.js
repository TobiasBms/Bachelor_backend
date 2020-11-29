const { DataTypes, Sequelize } = require("sequelize")

module.exports = sequelize => {
  const { Restaurant } = sequelize.models
  sequelize.define(
    "Manager",
    {
      restaurantId: {
        type: DataTypes.INTEGER,
        references: { model: Restaurant },
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "RESTRICT",
      },
      role: {
        type: DataTypes.ENUM({
          values: ["Admin", "Manager", "Waiter"],
        }),
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.CHAR(8),
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      registeredAt: {
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      lastLogin: {
        type: DataTypes.DATE,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      scopes: {
        withPassword: { attributes: {} },
      },
    }
  )
}
