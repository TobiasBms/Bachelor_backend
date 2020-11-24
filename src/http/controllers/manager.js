const managerService = require("../../services/manager")
const { getIdParam, authenticate } = require("../middleware")
const { NotFoundError, BadRequestError } = require("restify-errors")
const Roles = require("../../utils/roles")
const { Router } = require("restify-router")
const router = new Router()

router.post("/auth", auth)
router.get("", authenticate([Roles.Admin, Roles.Manager]), getAll)
router.get("/:id", authenticate(), getIdParam, getById)
router.post("", authenticate([Roles.Admin]), create)
router.put("/:id", authenticate(), getIdParam, update)
router.del("/:id", authenticate([Roles.Admin]), getIdParam, remove)
module.exports = router

async function auth(req, res, next) {
  try {
    const manager = await managerService.authenticate(req.body)
    res.send(200, manager)
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
    await managerService.remove(req.id)
    res.send(204)
    next()
  } catch (error) {
    next(error)
  }
}
