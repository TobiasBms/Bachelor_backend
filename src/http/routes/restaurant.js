const { models } = require('../../db')
const restaurantService = require('../../services/restaurant.service')
const { NotFoundError, BadRequestError } = require('restify-errors')
var Router = require('restify-router').Router
var router = new Router()
const { getIdParam } = require('../middleware/id')
const { getScopesQuery } = require('../middleware/scopes')

router.get('', getScopesQuery, getAll)
router.get('/:id', getIdParam, getScopesQuery, getById)
router.post('', create)
router.put('/:id', getIdParam, update)
router.del('/:id', getIdParam, remove)
module.exports = router

async function getAll(req, res, next) {
  try {
    const restaurants = await restaurantService.getAll(req.scopes)
    res.send(200, restaurants)
    next()
  } catch (error) {
    next(error)
  }
}

async function getById(req, res, next) {
  try {
    const restaurant = await restaurantService.getById(req.id, req.scopes)
    if (restaurant === null) {
      next(new NotFoundError('This restaurant does not exist in our database.'))
    } else {
      res.send(200, restaurant)
      next()
    }
  } catch (error) {
    next(error)
  }
}

async function create(req, res, next) {
  try {
    if (req.body.id) {
      next(
        new BadRequestError(
          'ID should not be provided, since it is automatically generated.'
        )
      )
    } else {
      const restaurant = await restaurantService.create(req.body)
      res.send(201, restaurant)
      next()
    }
  } catch (error) {
    next(error)
  }
}

async function update(req, res, next) {
  try {
    if (req.body.id !== req.id) {
      next(new BadRequestError('ID parameter does not match body.'))
    } else {
      await models.Restaurant.update(req.body, {
        where: { id: req.id },
      })
      res.send(204)
      next()
    }
  } catch (error) {
    next(error)
  }
}

async function remove(req, res, next) {
  try {
    await models.Restaurant.destroy({
      where: { id: req.id },
    })
    res.send(204)
    next()
  } catch (error) {
    next(error)
  }
}
