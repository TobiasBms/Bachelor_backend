const { models } = require("sequelize")
const { BadRequestError } = require("restify-errors")
const { getIdParam } = require("../utils")

const getAll = async (req, res, next) => {
  try {
    const extras = await models.Extra.findAll()
    res.send(200, extras)
    return next()
  } catch (error) {
    return next(new BadRequestError(error.message))
  }
}

const getById = async (req, res, next) => {
  try {
    const id = getIdParam(req)
    const extra = await models.Extra.findByPk(id)
    res.send(200, extra)
    return next()
  } catch (error) {
    return next(new BadRequestError(error.message))
  }
}

const update = async (req, res, next) => {
  try {
    const id = getIdParam(req)

    if (req.body.id !== id) {
      return next(new BadRequestError("id doens't match request body"))
    }

    await models.Extra.update(req.body, {
      id: id,
    })
    res.send(200)
    return next()
  } catch (error) {
    return next(new BadRequestError(error.message))
  }
}

const create = async (req, res, next) => {
  try {
    if (req.body.id) {
      return next(
        new BadRequestError(
          "ID should not be provided, since it is determined automatically by the database."
        )
      )
    }
    const extra = await models.Extra.create(req.body)
    res.send(201, extra)
    return next()
  } catch (error) {
    return next(new BadRequestError(error.message))
  }
}

const remove = async (req, res, next) => {
  try {
    const id = getIdParam(req)
    await models.Extra.destroy({
      where: {
        id: id,
      },
    })
    res.send(200)
    return next()
  } catch (error) {
    return next(new BadRequestError(error.message))
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
}
