const { noEntries, noId, notFound } = require("../../../config/errors.json")

const productService = require("../../services/product"),
  { getIdParam, getScopesQuery } = require("../middleware"),
  { NotFoundError, BadRequestError } = require("restify-errors"),
  { Router } = require("restify-router"),
  router = new Router()

router.get("", getScopesQuery, getAll)
router.get("/:id", getIdParam, getScopesQuery, getById)
router.post("", create)
router.put("/:id", getIdParam, update)
router.del("/:id", getIdParam, remove)
module.exports = router

async function getAll(req, res, next) {
  try {
    const products = await productService.getAll(req.scopes)
    if (products === null) {
      next(new NotFoundError(noEntries))
    }
    res.send(200, products)
    next()
  } catch (error) {
    next(error)
  }
}

async function getById(req, res, next) {
  try {
    const product = await productService.getById(req.id, req.scopes)
    if (product === null) {
      next(new NotFoundError(notFound))
    }
  } catch (error) {
    next(error)
  }
}

async function create(req, res, next) {
  try {
    if (req.body.id) {
      next(new BadRequestError(noId))
    }
    await productService.create(req.body)
    res.send(200)
    next()
  } catch (error) {
    next(error)
  }
}

async function update(req, res, next) {
  try {
    await productService.update(req.id, req.body)
    res.send(200)
    next()
  } catch (error) {
    next(error)
  }
}

async function remove(req, res, next) {
  try {
    await productService.remove(req.id)
    res.send(204)
    next()
  } catch (error) {
    next(error)
  }
}
