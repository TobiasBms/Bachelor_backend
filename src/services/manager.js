const { Manager } = require("../db").models
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { BadRequestError } = require("restify-errors")
require("dotenv").config()

module.exports = { authenticate, getAll, getById, create, update, remove }

function omitPassword(manager) {
  // eslint-disable-next-line no-unused-vars
  const { password, ...rest } = manager
  return rest
}

async function authenticate({ email, password }) {
  const manager = await Manager.scope("withPassword").findOne({
    where: { email },
    raw: true,
  })

  if (!manager || !(await bcrypt.compare(password, manager.password))) {
    throw new Error("Login failed")
  }
  const token = jwt.sign({ id: manager.id }, process.env.JWT_SECRET)
  return { ...omitPassword(manager), token }
}

async function getAll() {
  return await Manager.findAll()
}

async function getById(id) {
  return await Manager.findByPk(id)
}

async function create(body) {
  const manager = await Manager.findOne({
    where: {
      email: body.email,
    },
  })

  if (manager) {
    throw new BadRequestError("Manager already exist")
  }

  body.password = await bcrypt.hash(body.password, 10)

  return Manager.create(body)
}

async function update(id, body) {
  await Manager.update(body, { where: { id } })
}

async function remove(id) {
  await Manager.destroy({ where: { id } })
}
