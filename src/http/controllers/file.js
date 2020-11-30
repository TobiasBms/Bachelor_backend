const fileService = require("../../services/file")
const Roles = require("../../utils/roles")
const { getIdParam, authorize } = require("../middleware")
const { allowedFiles } = require("../../utils/file")
const { Router } = require("restify-router")
const { BadRequestError, NotFoundError } = require("restify-errors")
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
    if (!file) {
      next(new NotFoundError("Resource doesn't exist"))
    } else {
      res.send(200, file)
      next()
    }
  } catch (error) {
    next(error)
  }
}

async function create(req, res, next) {
  try {
    if (!req.files.data) throw new BadRequestError("Request was empty")
    else {
      const fileData = req.files.data
      if (!allowedFiles.includes(fileData.type)) {
        throw new BadRequestError("Filetype is not allowed")
      }

      const file = await fileService.create(req.user.restaurantId, fileData)
      res.send(201, file)
      next()
    }
  } catch (error) {
    next(error)
  }
}

async function remove(req, res, next) {
  try {
    const fileExists = await fileService.getById(req.id)
    if (!fileExists) {
      next(new NotFoundError("Resource doesn't exist"))
    }
    await fileService.remove(req.user.restaurantId, req.id)
    res.send(204)
    next()
  } catch (error) {
    next(error)
  }
}
