module.exports = function applyAssociations(sequelize){
    const {
        Restaurant,
        Product
      } = sequelize.models;


      Restaurant.hasMany(Product, {
        foreignKey: 'restaurant_id'
      });

      Product.belongsTo(Restaurant, {
        foreignKey: 'restaurant_id'
      });
};