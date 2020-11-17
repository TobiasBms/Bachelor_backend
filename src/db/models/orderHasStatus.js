const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('OrderHasStatus', {
    order_id: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Order,
        key: 'id',
      },
    },
    status_id: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.OrderStatus,
        key: 'id',
      },
    },
  })
}
