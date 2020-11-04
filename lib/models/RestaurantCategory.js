const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define('RestaurantCategory', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT
    },
    {
        timestamps: false,
        tableName: "RestaurantCategory"
    });
}

