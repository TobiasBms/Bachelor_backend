const restify = require("restify")
const restaurantController = require("./controllers/restaurant")
const restaurantCategoryController = require("./controllers/restaurantCategory")
const managerController = require("./controllers/manager")
const productController = require("./controllers/product")
const orderController = require("./controllers/order")
const fileController = require("./controllers/file")

/* Setup Restify server and register plugins */
const server = restify.createServer()
server.use(restify.plugins.bodyParser())
server.use(restify.plugins.queryParser())
server.pre(restify.pre.sanitizePath())

/* Apply API routes to server (using restify-router) */
orderController.applyRoutes(server, "/api/order")
restaurantController.applyRoutes(server, "/api/restaurant")
restaurantCategoryController.applyRoutes(server, "/api/restaurantcategory")
managerController.applyRoutes(server, "/api/manager")
productController.applyRoutes(server, "/api/product")
fileController.applyRoutes(server, "/api/file")

/* Exports */
module.exports = server
