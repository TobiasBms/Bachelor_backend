const { DataTypes, Sequelize } = require("sequelize")

module.exports = sequelize => {
  const { Restaurant } = sequelize.models
  sequelize.define(
    "Manager",
    {
      restaurant_id: {
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
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
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
      registered_at: {
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      last_login: {
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
