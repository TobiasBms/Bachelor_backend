const service = require('../../services/restaurantCategory'),
  { getIdParam, getScopesQuery } = require('../middleware'),
  { NotFoundError } = require('restify-errors'),
  { Router } = require('restify-router'),
  router = new Router()

router.get('', getScopesQuery, getAll)
router.get('/:id', getIdParam, getScopesQuery, getById)
module.exports = router

async function getAll(req, res, next) {
  try {
    const categories = await service.getAll(req.scopes)
    res.send(200, categories)
    next()
  } catch (error) {
    next(error)
  }
}

async function getById(req, res, next) {
  try {
    const category = await service.getById(req.id, req.scopes)
    if (category === null) {
      next(new NotFoundError('This category does not exist in our database.'))
    } else {
      res.send(200, category)
      next()
    }
  } catch (error) {
    next(error)
  }
}
