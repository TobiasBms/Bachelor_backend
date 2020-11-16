const { models } = require('../../db')
const { getIdParam } = require('../utils')

async function getAll(_req, res) {
  const managers = await models.Manager.findAll({
    include: [
      {
        model: models.ManagerRole,
        as: 'role',
        attributes: { exclude: ['restaurant_id'] },
      },
    ],
    attributes: { exclude: ['role_id'] },
  })
  res.send(200, managers)
}

async function getById(req, res) {
  try {
    const id = getIdParam(req)
    const manager = await models.Manager.findByPk(id, {
      include: [
        { model: models.Privilege },
        {
          model: models.ManagerRole,
          as: 'role',
          attributes: { exclude: ['restaurant_id'] },
        },
      ],
      attributes: { exclude: ['role_id'] },
    })
    if (manager) {
      res.send(200, manager)
    } else {
      res.send(404, {
        message: 'This manager does not exist in our database.',
      })
    }
  } catch (error) {
    res.send(400, { message: error.message })
  }
}

async function create(req, res) {
  try {
    if (req.body.id) {
      res.send(400, {
        message:
          'ID should not be provided, since it is determined automatically by the database.',
      })
    } else {
      const manager = await models.Manager.create(req.body)
      res.send(201, manager)
    }
  } catch (error) {
    res.send(400, {
      message: error.message,
    })
  }
}

async function update(req, res) {
  const id = getIdParam(req)
  if (req.body.id === id) {
    await models.Manager.update(req.body, {
      where: {
        id: id,
      },
    })
    res.send(200)
  } else {
    res.send(400, {
      message: `Bad request: param ID (${id}) does not match body ID (${req.body.id}).`,
    })
  }
}

async function remove(req, res) {
  const id = getIdParam(req)
  await models.Manager.destroy({
    where: {
      id: id,
    },
  })
  res.send(200)
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
}
