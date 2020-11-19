const { Manager } = require("../db").models

module.exports = { authenticate, getAll, getById, create, update, remove }

// eslint-disable-next-line no-unused-vars
async function authenticate({ email, password }) {
  throw new Error("Not implemented")
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
