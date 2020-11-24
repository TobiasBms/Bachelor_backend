require("dotenv").config()
const jwt = require("restify-jwt-community")
const { Manager } = require("../../db").models
const { ForbiddenError } = require("restify-errors")
const Errors = require("../../../config/errors.json")

module.exports = function authorize(role) {
  return [
    jwt({ secret: process.env.JWT_SECRET }),
    async (req, res, next) => {
      const manager = await Manager.findOne({
        raw: true,
        where: { id: req.user.id },
      })
      console.log(manager.role)
      if (manager.role !== role) {
        return next(new ForbiddenError(Errors.noAccess))
      }
      return next()
    },
  ]
}
