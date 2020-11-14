const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('City', {
    zip_code: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.CHAR
    },
    name: DataTypes.STRING,
  });
};