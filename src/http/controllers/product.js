const { noId, notFound } = require("../../../config/errors.json")

const productService = require("../../services/product")
const Roles = require("../../utils/roles")
const { authorize } = require("../middleware")
const { getIdParam, getScopesQuery } = require("../middleware")
const { NotFoundError, BadRequestError } = require("restify-errors")
const { Router } = require("restify-router")
const router = new Router()

router.get("", getScopesQuery, getAll)
router.get("/:id", getIdParam, getScopesQuery, getById)
router.post("", authorize([Roles.Admin, Roles.Manager]), create)
router.put("/:id", authorize([Roles.Admin, Roles.Manager]), getIdParam, update)
router.del("/:id", authorize([Roles.Admin, Roles.Manager]), getIdParam, remove)
module.exports = router

async function getAll(req, res, next) {
  try {
    const products = await productService.getAll(req.scopes)
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
    } else {
      res.send(200, product)
      next()
    }
  } catch (error) {
    next(error)
  }
}

async function create(req, res, next) {
  try {
    if (req.body.id) {
      next(new BadRequestError(noId))
    } else {
      await productService.create(req.body)
      res.send(200)
      next()
    }
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
