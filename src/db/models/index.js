const modelDefinitions = [
  require('./city'),
  require('./restaurant'),
  require('./restaurantHours'),
  require('./restaurantCategory'),
  require('./privilege'),
  require('./managerHasPrivilege'),
  require('./restaurantHasCategory'),
  require('./restaurantSeat'),
  require('./manager'),
  require('./managerRole'),
  require('./roleHasPrivilege'),
]

module.exports = { modelDefinitions }
