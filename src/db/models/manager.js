const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("Manager", {
    restaurant_id: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Restaurant,
        key: "id",
      },
    },
    role_id: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.ManagerRole,
        key: "id",
      },
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.CHAR,
    password: DataTypes.STRING,
    registered_at: DataTypes.DATEONLY,
    last_login: DataTypes.DATE,
  })
}
