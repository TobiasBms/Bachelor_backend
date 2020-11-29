const { noId } = require("../../../config/errors.json")
const fileService = require("../../services/file")
const Roles = require("../../utils/roles")
const { authorize } = require("../middleware")
const { BadRequestError } = require("restify-errors")
const { Router } = require("restify-router")
const router = new Router()

router.get("", getAll)
router.post("", authorize([Roles.Admin, Roles.Manager]), create)
module.exports = router

async function getAll(req, res, next) {
  try {
    const restaurantId = req.query.restaurantId
    const products = await fileService.getAll(restaurantId)
    res.send(200, products)
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
