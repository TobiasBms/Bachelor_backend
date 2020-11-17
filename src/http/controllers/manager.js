const managerService = require("../../services/manager"),
  { getIdParam, getScopesQuery } = require("../middleware"),
  { NotFoundError, BadRequestError } = require("restify-errors"),
  { Router } = require("restify-router"),
  router = new Router()

router.post("/auth", authenticate)
router.get("", getScopesQuery, getAll)
router.get("/:id", getIdParam, getScopesQuery, getById)
router.post("", create)
router.put("/:id", getIdParam, update)
router.del("/:id", getIdParam, remove)
module.exports = router

async function authenticate(req, res, next) {
  try {
    await managerService.authenticate(req.body)
    next()
  } catch (error) {
    next(error)
  }
}

async function getAll(req, res, next) {
  try {
    const managers = await managerService.getAll(req.scopes)
    res.send(200, managers)
    next()
  } catch (error) {
    next(error)
  }
}

async function getById(req, res, next) {
  try {
    const manager = await managerService.getById(req.id, req.scopes)
    if (manager === null) {
      next(new NotFoundError("This manager does not exist in our database."))
    } else {
      res.send(200, manager)
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
      const manager = await managerService.create(req.body)
      res.send(201, manager)
      next()
    }
  } catch (error) {
    next(error)
  }
}

async function update(req, res, next) {
  try {
    if (req.body.id !== req.id) {
      next(new BadRequestError("ID parameter does not match body."))
    } else {
      await managerService.update(req.id, req.body)
      res.send(204)
      next()
    }
  } catch (error) {
    next(error)
  }
}

async function remove(req, res, next) {
  try {
    await managerService.destroy(req.id)
    res.send(204)
    next()
  } catch (error) {
    next(error)
  }
}
