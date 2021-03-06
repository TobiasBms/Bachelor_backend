const { BadRequestError } = require("restify-errors")

/* Extracts list of scopes from query parameter and attaches to req.scopes */
module.exports = function getScopesQuery(req, _res, next) {
  /* Make sure that default scope is used if not overridden */
  req.scopes = "defaultScope"
  const scopes = req.query.scopes
  if (scopes === undefined) return next()
  if (scopes === "") return next(new BadRequestError("Invalid query string"))
  req.scopes = scopes.split(",")
  return next()
}
