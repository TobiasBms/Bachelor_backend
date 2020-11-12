module.exports = function applyAssociations(sequelize){
    const {
        Restaurant,
        Product
      } = sequelize.models;

      Product.belongsTo('Restaurant', {
        foreignKey: 'restaurant_id'
      });

      Restaurant.hasMany('Product', {
        foreignKey: 'restaurant_id'
      });


};