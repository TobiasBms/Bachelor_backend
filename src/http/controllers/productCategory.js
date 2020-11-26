const { Router } = require("restify-router")
const { noId } = require("../../../config/errors.json")
const productService = require("../../services/productCategory")
const { getIdParam, authorize } = require("../middleware")
const getScopesQuery = require("../middleware/scopes")
const router = new Router()
const { BadRequestError } = require("restify")
router.post("", authorize(), create)
router.get("", authorize(), getScopesQuery, getAll)
router.get("/:id", authorize(), getIdParam, getById)
router.del("/:id", authorize(), getIdParam, remove)
router.put("/:id", authorize(), getIdParam, update)

module.exports = router

async function getAll(req, res, next) {
  try {
    const productCategories = await productService.getAll(req.scopes)
    res.send(200, productCategories)
    next()
  } catch (error) {
    next(error)
  }
}
async function getById(req, res, next) {
  try {
    const productCategory = await productService.getById(req.id, req.scopes)
    res.send(200, productCategory)
    next()
  } catch (error) {
    next(error)
  }
}

async function update(req, res, next) {
  try {
    await productService.update(req.id, req.body)
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
      await productService.create(req.body)
      res.send(200)
      next()
    }
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
