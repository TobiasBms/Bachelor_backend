const {
  noEntries,
  noId,
  noBodyProvided,
} = require("../../../config/errors.json")
const orderService = require("../../services/order")
const { getIdParam, getScopesQuery } = require("../middleware")
const { NotFoundError, BadRequestError } = require("restify-errors")
const { Router } = require("restify-router")
const router = new Router()
const { authorize } = require("../middleware")

router.get("", authorize(), getScopesQuery, getAll)
router.get("/:id", authorize(), getIdParam, getScopesQuery, getById)
router.post("", authorize(), create)
router.put("/:id", authorize(), getIdParam, update)
router.del("/:id", authorize(), getIdParam, remove)
module.exports = router

async function getAll(req, res, next) {
  try {
    const orders = await orderService.getAll(req.scopes)
    res.send(200, orders)
    next()
  } catch (error) {
    next(error)
  }
}

async function getById(req, res, next) {
  try {
    const order = await orderService.getById(req.id, req.scopes)
    if (order === null) {
      next(new NotFoundError(noEntries))
    } else {
      res.send(200, order)
      next()
    }
  } catch (error) {
    next(error)
  }
}

async function create(req, res, next) {
  try {
    if (req.body === undefined) {
      return next(new BadRequestError(noBodyProvided))
    }
    const order = await orderService.create(req.body)
    res.send(201, order)
    next()
  } catch (error) {
    next(error)
  }
}

async function update(req, res, next) {
  try {
    if (req.body.id !== req.id) {
      next(new BadRequestError(noId))
    } else {
      await orderService.update(req.id, req.body)
      res.send(204)
      next()
    }
  } catch (error) {
    next(error)
  }
}

async function remove(req, res, next) {
  try {
    await orderService.remove(req.id)
    res.send(204)
    next()
  } catch (error) {
    next(error)
  }
}
