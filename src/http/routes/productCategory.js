const { models } = require("sequelize")
const { getIdParam } = require("../utils")
const { BadRequestError } = require("restify-errors")

async function getAll(_req, res, next) {
  try {
    let productCategories = await models.ProductCategory.findAll()
    res.send(200, productCategories)
    return next()
  } catch (error) {
    return next(new BadRequestError(error.message))
  }
}

async function getById(req, res, next) {
  try {
    const id = getIdParam(req)
    let prouductCategory = await models.ProductCategory.findByPK(id)
    if (prouductCategory) {
      res.send(200, prouductCategory)
      return next()
    }
  } catch (error) {
    return next(new BadRequestError(error.message))
  }
}

async function create(req, res, next) {
  try {
    if (req.body.id) {
      res.send(400, {
        message:
          "ID should not be provided, since it is determined automatically by the database.",
      })
    }

    let productCategory = await models.ProductCategory.create(req.body)
    return next(201, productCategory)
  } catch (error) {
    return next(new BadRequestError(error.message))
  }
}

async function update(req, res, next) {
  try {
    const id = getIdParam(req)
    await models.ProductCategory.update(req.body, {
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

async function remove(req, res, next) {
  try {
    const id = getIdParam(req)
    await models.ProductCategory.destroy({
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
