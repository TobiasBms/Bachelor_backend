const { models } = require("../../db")
const { getIdParam } = require("../utils")

async function getAll(_req, res) {
  try {
    const restaurantHours = await models.RestaurantHours.findAll()
    res.send(200, restaurantHours)
  } catch (error) {
    res.status(400, {
      message: error.message,
    })
  }
}

async function create(req, res) {
  try {
    const restaurantHours = await models.RestaurantHours.create(req.body)
    res.send(201, restaurantHours)
  } catch (error) {
    res.send(400, {
      message: error.message,
    })
  }
}

async function update(req, res) {
  try {
    const id = getIdParam(req)
    const { day_of_week } = req.body

    if (req.body.restaurant_id === id) {
      const restaurantHours = await models.RestaurantHours.update(req.body, {
        where: {
          restaurant_id: id,
          day_of_week: day_of_week,
        },
      })

      res.send(201, restaurantHours)
    }
  } catch (error) {
    res.send(400, {
      message: error.message,
    })
  }
}

async function remove(req, res) {
  try {
    const id = getIdParam(req)
    const { day_of_week } = req.body

    const restaurantHours = await models.RestaurantHours.destroy({
      where: {
        restaurant_id: id,
        day_of_week: day_of_week,
      },
    })

    res.send(200, {
      message: restaurantHours,
    })
  } catch (error) {
    res.send(401, {
      message: error.message,
    })
  }
}

module.exports = {
  getAll,
  create,
  update,
  remove,
}
