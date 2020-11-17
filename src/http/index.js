const restify = require("restify"),
  restaurantController = require("./controllers/restaurant"),
<<<<<<< HEAD
  restaurantCategoryController = require("./controllers/restaurantCategory"),
  productController = require("./controllers/product")
=======
  restaurantCategoryController = require("./controllers/restaurantCategory")
>>>>>>> master

const routes = {
  restauranthours: require("./routes/restaurantHours"),
  restaurantseat: require("./routes/restaurantSeat"),
  privilege: require("./routes/privilege"),
  manager: require("./routes/manager"),
  role: require("./routes/managerRole"),
<<<<<<< HEAD
=======
  product: require("./routes/product"),
>>>>>>> master
}

const server = restify.createServer()
server.use(restify.plugins.bodyParser())
server.use(restify.plugins.queryParser())
server.pre(restify.pre.sanitizePath())

restaurantController.applyRoutes(server, "/api/restaurant")
restaurantCategoryController.applyRoutes(server, "/api/restaurantcategory")
<<<<<<< HEAD
productController.applyRoutes(server, "/api/product")
=======
>>>>>>> master

function makeHandlerAwareOfAsyncErrors(handler) {
  return async function (req, res, next) {
    try {
      await handler(req, res)
    } catch (error) {
      next(error)
    }
  }
}

for (const [routeName, routeController] of Object.entries(routes)) {
  if (routeController.getAll) {
    server.get(`/api/${routeName}`, routeController.getAll)
  }
  if (routeController.getById) {
    server.get(
      `/api/${routeName}/:id`,
      makeHandlerAwareOfAsyncErrors(routeController.getById)
    )
  }
  if (routeController.create) {
    server.post(
      `/api/${routeName}`,
      makeHandlerAwareOfAsyncErrors(routeController.create)
    )
  }
  if (routeController.update) {
    server.put(
      `/api/${routeName}/:id`,
      makeHandlerAwareOfAsyncErrors(routeController.update)
    )
  }
  if (routeController.remove) {
    server.del(
      `/api/${routeName}/:id`,
      makeHandlerAwareOfAsyncErrors(routeController.remove)
    )
  }
}

module.exports = server
