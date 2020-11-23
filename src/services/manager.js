const { Manager } = require("../db").models
const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = { authenticate, getAll, getById, create, update, remove }

async function authenticate({ email, password }) {
  const manager = await Manager.findOne({
    where: { email, password },
    raw: true,
  })
  if (manager !== null) {
    const token = jwt.sign({ id: manager.id }, process.env.JWT_SECRET)
    return { ...manager, token }
  }
}

async function getAll(scopes = []) {
  return await Manager.scope(scopes).findAll()
}

async function getById(id, scopes = []) {
  return await Manager.scope(scopes).findByPk(id)
}

async function create(body) {
  return await Manager.create(body)
}

async function update(id, body) {
  await Manager.update(body, { where: { id } })
}

async function remove(id) {
  await Manager.destroy({ where: { id } })
}
