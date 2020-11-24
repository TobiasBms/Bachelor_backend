require("dotenv").config()
const jwt = require("restify-jwt-community")
const { Manager } = require("../../db").models
const { ForbiddenError } = require("restify-errors")
const Errors = require("../../../config/errors.json")

module.exports = function authorize(roles = []) {
  if (typeof privileges === "string") roles = [roles]

  return [
    jwt({ secret: process.env.JWT_SECRET }),
    async (req, res, next) => {
      const manager = await Manager.findOne({
        raw: true,
        where: { id: req.user.id },
      })
      if (roles.length && !roles.includes(manager.role)) {
        return next(new ForbiddenError(Errors.noAccess))
      }
      return next()
    },
  ]
}
