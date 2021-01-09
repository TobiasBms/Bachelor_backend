const { Router } = require("restify-router")
const { noId } = require("../../../config/errors.json")
const categoryService = require("../../services/productCategory")
const { getIdParam, authorize } = require("../middleware")
const getScopesQuery = require("../middleware/scopes")
const router = new Router()
const { BadRequestError, NotFoundError } = require("restify-errors")
router.post("", authorize(), create)
router.get("", getScopesQuery, getAll)
router.get("/:id", getScopesQuery, getIdParam, getById)
router.del("/:id", authorize(), getIdParam, remove)
router.put("/:id", authorize(), getIdParam, update)

module.exports = router

async function getAll(req, res, next) {
  try {
    const { restaurantid } = req.query
    const productCategories = await categoryService.getAll(
      req.scopes,
      restaurantid
    )
    res.send(200, productCategories)
    next()
  } catch (error) {
    next(error)
  }
}

async function getById(req, res, next) {
  try {
    const productCategory = await categoryService.getById(req.id, req.scopes)
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
    await categoryService.update(req.id, req.body)
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
      await categoryService.create(req.body)
      res.send(200)
      next()
    }
  } catch (error) {
    next(error)
  }
}
async function remove(req, res, next) {
  try {
    await categoryService.remove(req.id)
    res.send(204)
    next()
  } catch (error) {
    next(error)
  }
}
