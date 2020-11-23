require("dotenv").config()
const jwt = require("restify-jwt-community")

module.exports = function authorize(roles) {
  return [
    jwt({ secret: process.env.JWT_SECRET }),
    async (req, res, next) => {
      return next()
    },
  ]
}
