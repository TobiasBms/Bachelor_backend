const { BadRequestError } = require("restify-errors")

// Converts id parameter to a number and attaches to req.id
module.exports = function getIdParam(req, _res, next) {
  const id = req.params.id
  if (!/^\d+$/.test(id))
    return next(new BadRequestError("Invalid id parameter"))
  req.id = Number.parseInt(id, 10)
  return next()
}
