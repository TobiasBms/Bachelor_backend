const restify = require("restify")
const restaurantController = require("./controllers/restaurant")
const restaurantCategoryController = require("./controllers/restaurantCategory")
const managerController = require("./controllers/manager")
const productController = require("./controllers/product")
const orderController = require("./controllers/order")
const productCategoryController = require("./controllers/productCategory")
const extraController = require("./controllers/extra")
/* Setup Restify server and register plugins */
const server = restify.createServer()
server.use(restify.plugins.bodyParser())
server.use(restify.plugins.queryParser())
server.pre(restify.pre.sanitizePath())

/* Apply API routes to server (using restify-router) */
orderController.applyRoutes(server, "/api/order")
productCategoryController.applyRoutes(server, "/api/productcategory")
restaurantController.applyRoutes(server, "/api/restaurant")
restaurantCategoryController.applyRoutes(server, "/api/restaurantcategory")
managerController.applyRoutes(server, "/api/manager")
productController.applyRoutes(server, "/api/product")
extraController.applyRoutes(server, "/api/extra")

/* Exports */
module.exports = server
