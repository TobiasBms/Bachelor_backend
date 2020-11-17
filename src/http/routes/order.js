const { models } = require('../../db')
const { BadRequestError } = require('restify-errors')
async function getAll(_req, res, next) {
  try {
    const orders = await models.Order.findAll({
      include: [
        { model: models.OrderStatus },
        { model: models.OrderRating },
        { model: models.Product },
      ],
    })
    res.send(200, orders)
    return next()
  } catch (error) {
    return next(new BadRequestError(error.message))
  }
}

module.exports = {
  getAll,
}
