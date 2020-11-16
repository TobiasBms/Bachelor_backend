module.exports = function applyAssociations(sequelize) {
    const {
        Restaurant,
        Extra,
        Product,
        ProductHasExtra    
    } = sequelize.models;   
    
    Restaurant.hasMany(Extra, {
        foreignKey: 'restaurant_id'
    });

    Extra.belongsTo(Restaurant, {
        foreignKey: 'restaurant_id'
    });

    Extra.belongsToMany(Product,{
        through: ProductHasExtra,
        foreignKey: 'extra_id',
        otherKey: 'product_id',
        as: 'extra'
    });


    Product.belongsToMany(Extra, {
        through: ProductHasExtra,
        foreignKey: 'product_id',
        otherKey: 'extra_id',
        as: 'product'
    });

  };
  