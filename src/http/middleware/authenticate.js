require("dotenv").config()
const jwt = require("restify-jwt-community")
const managerService = require("../../services/manager")
const { ForbiddenError } = require("restify-errors")
const Errors = require("../../../config/errors.json")

module.exports = function authorize(roles = []) {
  if (typeof privileges === "string") roles = [roles]

  return [
    jwt({ secret: process.env.JWT_SECRET }),
    async (req, res, next) => {
      try {
        const manager = await managerService.getById(req.user.id)
        if (roles.length && !roles.includes(manager.role)) {
          return next(new ForbiddenError(Errors.noAccess))
        }
        next()
      } catch (error) {
        next(error)
      }
    },
  ]
}
