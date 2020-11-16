const { models } = require('../../db')
const restaurantService = require('../../services/restaurant.service')
var Router = require('restify-router').Router
var router = new Router()
const { getIdParam } = require('../middleware/id')

router.get('', getAll)
router.get('/:id', getIdParam, getById)
router.post('', create)
router.put('/:id', getIdParam, update)
router.del('/:id', getIdParam, remove)
module.exports = router

function getAll(_req, res, next) {
  restaurantService
    .getAll()
    .then(restaurants => {
      res.send(200, restaurants)
      next()
    })
    .catch(next)
}

async function getById(req, res) {
  try {
    const restaurant = await models.Restaurant.findByPk(req.id, {
      include: [
        { model: models.City, as: 'city' },
        {
          model: models.RestaurantCategory,
          as: 'categories',
          through: { attributes: [] },
        },
        {
          model: models.RestaurantHours,
          as: 'hours',
          attributes: { exclude: ['restaurant_id'] },
        },
      ],
      attributes: { exclude: ['zip_code'] },
    })
    if (restaurant) {
      res.send(200, restaurant)
    } else {
      res.send(404, {
        message: 'This restaurant does not exist in our database.',
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
      const restaurant = await models.Restaurant.create(req.body)
      res.send(201, restaurant)
    }
  } catch (error) {
    res.send(400, {
      message: error.message,
    })
  }
}

async function update(req, res) {
  // We only accept an UPDATE request if the `:id` param matches the body `id`
  if (req.body.id === req.id) {
    await models.Restaurant.update(req.body, {
      where: {
        id: req.id,
      },
    })
    res.status(200).end()
  } else {
    res
      .status(400)
      .send(
        `Bad request: param ID (${req.id}) does not match body ID (${req.body.id}).`
      )
  }
}

async function remove(req, res) {
  await models.Restaurant.destroy({
    where: {
      id: req.id,
    },
  })
  res.status(200).end()
}
