const { DataTypes, Sequelize } = require("sequelize")

module.exports = sequelize => {
  const { City } = sequelize.models
  sequelize.define("Restaurant", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.CHAR(4),
      references: { model: City, key: "zip_code" },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    },
    address: {
      type: DataTypes.STRING,
    },
    registered_at: {
      type: DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    location: {
      type: DataTypes.GEOMETRY("POINT"),
    },
    phone: {
      type: DataTypes.CHAR(8),
    },
    email: {
      type: DataTypes.STRING,
    },
    website: {
      type: DataTypes.STRING,
    },
    logo_id: {
      type: DataTypes.INTEGER,
    },
    banner_id: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
    },
    smiley_id: {
      type: DataTypes.INTEGER,
    },
  })
}
