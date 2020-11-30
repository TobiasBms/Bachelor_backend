const restaurantService = require("../../services/restaurant"),
  { getIdParam, getScopesQuery } = require("../middleware"),
  { NotFoundError, BadRequestError } = require("restify-errors"),
  { Router } = require("restify-router"),
  router = new Router()
const Roles = require("../../utils/roles")
const { authorize } = require("../middleware")

router.get("", getScopesQuery, getAll)
router.get("/:id", getIdParam, getScopesQuery, getById)
router.post("", authorize([Roles.Admin]), create)
router.post(
  "/:id/category/:categoryId",
  authorize([Roles.Admin]),
  addToCategory
)
router.del(
  "/:id/category/:categoryId",
  authorize([Roles.Admin]),
  removeFromCategory
)
router.put("/:id", authorize([Roles.Admin]), getIdParam, update)
router.del("/:id", authorize([Roles.Admin]), getIdParam, remove)
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
      next(new NotFoundError("This restaurant does not exist in our database."))
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
          "ID should not be provided, since it is automatically generated."
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

async function addToCategory(req, res, next) {
  try {
    const id = Number.parseInt(req.params.id, 10)
    const categoryId = Number.parseInt(req.params.categoryId, 10)
    const result = await restaurantService.addToCategory(id, categoryId)
    res.send(201, result)
    next()
  } catch (error) {
    next(error)
  }
}

async function removeFromCategory(req, res, next) {
  try {
    const id = Number.parseInt(req.params.id, 10)
    const categoryId = Number.parseInt(req.params.categoryId, 10)
    await restaurantService.removeFromCategory(id, categoryId)
    res.send(204)
    next()
  } catch (error) {
    next(error)
  }
}

async function update(req, res, next) {
  try {
    if (req.body.id !== req.id) {
      next(new BadRequestError("ID parameter does not match body."))
    } else {
      await restaurantService.update(req.id, req.body)
      res.send(204)
      next()
    }
  } catch (error) {
    next(error)
  }
}

async function remove(req, res, next) {
  try {
    await restaurantService.remove(req.id)
    res.send(204)
    next()
  } catch (error) {
    next(error)
  }
}
