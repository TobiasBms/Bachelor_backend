const { models } = require('../../db')
const { getIdParam } = require('../utils')

async function getAll(_req, res) {
  try {
    const products = await models.Product.findAll({
      include: [{ model: models.Restaurant }],
    })
    res.send(200, products)
  } catch (error) {
    res.end(400, { message: error.message })
  }
}

async function getById(req, res) {
  try {
    const id = getIdParam(req)
    const product = await models.Product.findByPk(id)
    if (product) {
      res.send(200, product)
    } else {
      res.send(404, {
        message: 'This product does not exist in our database.',
      })
    }
  } catch (error) {
    res.send(400, { message: error.message })
  }
}

async function create(req, res) {
  try {
    if (req.body.id) {
      res.send(400, {
        message:
          'ID should not be provided, since it is determined automatically by the database.',
      })
    } else {
      const product = await models.Product.create(req.body)
      res.send(201, product)
    }
  } catch (error) {
    res.send(400, {
      message: error.message,
    })
  }
}

async function update(req, res) {
  const id = getIdParam(req)
  if (req.body.id === id) {
    await models.Product.update(req.body, {
      where: {
        id: id,
      },
    })
    res.send(200)
  } else {
    res.send(400, {
      message: `Bad request: param ID (${id}) does not match body ID (${req.body.id}).`,
    })
  }
}

async function remove(req, res) {
  const id = getIdParam(req)
  await models.Product.destroy({
    where: {
      id: id,
    },
  })
  res.send(200)
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
}
