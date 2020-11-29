const { noId } = require("../../../config/errors.json")
const fileService = require("../../services/file")
const Roles = require("../../utils/roles")
const { getIdParam, authorize } = require("../middleware")
const { BadRequestError } = require("restify-errors")
const { Router } = require("restify-router")
const router = new Router()

router.get("", authorize([Roles.Admin, Roles.Manager]), getAll)
router.get("/:id", getIdParam, getById)
router.post("", authorize([Roles.Admin, Roles.Manager]), create)
router.del("/:id", authorize([Roles.Admin, Roles.Manager]), getIdParam, remove)
module.exports = router

async function getAll(req, res, next) {
  try {
    const files = await fileService.getAll(req.user.restaurantId)
    res.send(200, files)
    next()
  } catch (error) {
    next(error)
  }
}

async function getById(req, res, next) {
  try {
    const file = await fileService.getById(req.id)
    res.send(200, file)
    next()
  } catch (error) {
    next(error)
  }
}

async function create(req, res, next) {
  try {
    if (req.body.id) return next(new BadRequestError(noId))
    const file = await fileService.create(req.user.restaurantId, req.files)
    res.send(201, file)
    next()
  } catch (error) {
    next(error)
  }
}

async function remove(req, res, next) {
  try {
    await fileService.remove(req.id)
    res.send(204)
    next()
  } catch (error) {
    next(error)
  }
}
