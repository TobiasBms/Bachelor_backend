const { Router } = require("restify-router")
const { noId } = require("../../../config/errors.json")
const extraService = require("../../services/extra")
const { getIdParam, authorize } = require("../middleware")
const getScopesQuery = require("../middleware/scopes")
const { BadRequestError, NotFoundError } = require("restify-errors")
const Roles = require("../../utils/roles")

const router = new Router()
router.post("", authorize([Roles.Admin, Roles.Manager]), create)
router.post(
  "/:id/product/:productId",
  authorize([Roles.Admin, Roles.Manager]),
  addToProduct
)
router.get("", authorize(), getScopesQuery, getAll)
router.get("/:id", authorize(), getIdParam, getById)
router.del("/:id", authorize([Roles.Admin, Roles.Manager]), getIdParam, remove)
router.put("/:id", authorize([Roles.Admin, Roles.Manager]), getIdParam, update)

module.exports = router

async function getAll(req, res, next) {
  try {
    const productCategories = await extraService.getAll(req.scopes)
    res.send(200, productCategories)
    next()
  } catch (error) {
    next(error)
  }
}
async function getById(req, res, next) {
  try {
    const productCategory = await extraService.getById(req.id, req.scopes)
    if (productCategory) {
      res.send(200, productCategory)
    } else {
      return next(new NotFoundError())
    }

    next()
  } catch (error) {
    next(error)
  }
}

async function update(req, res, next) {
  try {
    await extraService.update(req.id, req.body)
    res.send(200)
  } catch (error) {
    next(error)
  }
}

async function create(req, res, next) {
  try {
    if (req.body.id) {
      next(new BadRequestError(noId))
    } else {
      await extraService.create(req.body)
      res.send(200)
      next()
    }
  } catch (error) {
    next(error)
  }
}

async function addToProduct(req, res, next) {
  try {
    const id = Number(req.params.id)
    const productId = Number(req.params.productId)

    await extraService.addToProduct(productId, id)
    res.send(200)
    next()
  } catch (error) {
    next(error)
  }
}

async function remove(req, res, next) {
  try {
    await extraService.remove(req.id)
    res.send(204)
    next()
  } catch (error) {
    next(error)
  }
}
