const { models } = require('../../db')
const { getIdParam } = require('../utils')
const { BadRequestError } = require('restify-errors')

async function getAll(_req, res, next) {
  try {
    const products = await models.Product.findAll({
      include: [{ model: models.Restaurant }],
    })
    res.send(200, products)
    return next()
  } catch (error) {
    res.end(400)
    return next(error.message)
  }
}

async function getById(req, res, next) {
  try {
    const id = getIdParam(req)
    const product = await models.Product.findByPk(id, {
      include: [
        { model: models.ProductCategory, as: 'productCategory' },
        {
          model: models.Extra,
          as: 'extra',
        },
      ],
    })
    if (product) {
      res.send(200, product)
    } else {
      res.send(404)
      return next(new BadRequestError('Not found'))
    }
  } catch (error) {
    res.send(400)
    return next(new BadRequestError(error.message))
  }
}

async function create(req, res, next) {
  try {
    if (req.body.id) {
      return next(
        new BadRequestError(
          'ID should not be provided, since it is determined automatically by the database.'
        )
      )
    }
    const product = await models.Product.create(req.body)
    res.send(201, product)
    return next()
  } catch (error) {
    return next(new BadRequestError(error.message))
  }
}

async function update(req, res, next) {
  const id = getIdParam(req)
  if (req.body.id === id) {
    await models.Product.update(req.body, {
      where: {
        id: id,
      },
    })
    res.send(200)
    return next()
  } else {
    return next(
      new BadRequestError(
        `Bad request: param ID (${id}) does not match body ID (${req.body.id}).`
      )
    )
  }
}

async function remove(req, res, next) {
  const id = getIdParam(req)
  await models.Product.destroy({
    where: {
      id: id,
    },
  })
  res.send(204)
  return next()
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
}
