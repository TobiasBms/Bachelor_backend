const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define(
    "Manager",
    {
      restaurantId: {
        type: DataTypes.NUMBER,
        references: {
          model: sequelize.models.Restaurant,
          key: "id",
        },
      },
      role: DataTypes.ENUM({
        values: ["Admin", "Manager", "Waiter"],
      }),
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.CHAR,
      password: DataTypes.STRING,
      registeredAt: DataTypes.DATEONLY,
      lastLogin: DataTypes.DATE,
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
