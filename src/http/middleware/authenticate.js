require("dotenv").config()
const jwt = require("restify-jwt-community")
const { ManagerHasPrivilege } = require("../../db").models
const { ForbiddenError } = require("restify-errors")
const Errors = require("../../../config/errors.json")

module.exports = function authorize(privilege) {
  return [
    jwt({ secret: process.env.JWT_SECRET }),
    async (req, res, next) => {
      const privileges = await ManagerHasPrivilege.findAll({
        raw: true,
        where: {
          manager_id: req.user.id,
          privilege_id: privilege,
        },
      })
      console.log(privileges)
      if (!privileges.length) {
        return next(new ForbiddenError(Errors.noAccess))
      }
      return next()
    },
  ]
}
