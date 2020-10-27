const {Sequalize, Model, DataTypes} = require("sequelize");

module.exports = (sequalize,Sequalize) => {
    return sequalize.define('Restaurant', {
        restaurant_name: DataTypes.STRING,
        adresse:DataTypes.STRING
    })
}
