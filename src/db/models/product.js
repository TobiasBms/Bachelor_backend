const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Product', {
        restaurant_id: {
            type: DataTypes.NUMBER,
            references: {
                model: sequelize.models.Restaurant,
                key: 'id'
            }
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        image_id: DataTypes.NUMBER,
        price: DataTypes.DECIMAL,
        sold_out: DataTypes.BOOLEAN,
        hidden: DataTypes.BOOLEAN
    });
}