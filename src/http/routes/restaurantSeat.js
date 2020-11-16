const { models } = require('../../db')
const { getIdParam } = require('../utils')

async function getAll(_req, res) {
  const seat = await models.RestaurantSeat.findAll()
  res.send(200, seat)
}

async function getById(req, res) {
  try {
    const id = getIdParam(req)
    const seat = await models.RestaurantSeat.findByPk(id)
    if (seat) {
      res.send(200, seat)
    } else {
      res.send(404, {
        message: 'This seat does not exist in our database.',
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
      const seat = await models.RestaurantSeat.create(req.body)
      res.send(201, seat)
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
    await models.RestaurantSeat.update(req.body, {
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
  await models.RestaurantSeat.destroy({
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
