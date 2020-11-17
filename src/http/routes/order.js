const { models } = require('../../db')

async function getAll(_req, res, next) {
  try {
    const orders = await models.Order.findAll({
      include: [
        { model: models.OrderStatus },
        { model: models.OrderRating },
        { model: models.Product },
      ],
    })
    res.send(200, order)
    return next()
  } catch (error) {
    res.end(400)
    return next(error.message)
  }
}

module.exports = {
  getAll,
}
