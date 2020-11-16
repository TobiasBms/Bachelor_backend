const { BadRequestError } = require('restify-errors')

// Extracts list of scopes from query parameter and attaches to req.scopes
function getScopesQuery(req, _res, next) {
  const scopes = req.query.scopes
  if (scopes === undefined) return next()
  if (scopes === '') return next(new BadRequestError('Invalid query string'))
  req.scopes = scopes.split(',')
  return next()
}

module.exports = { getScopesQuery }
