const restify = require("restify")
const cors = require("cors")
const restaurantController = require("./controllers/restaurant")
const restaurantCategoryController = require("./controllers/restaurantCategory")
const managerController = require("./controllers/manager")
const productController = require("./controllers/product")
const orderController = require("./controllers/order")
const fileController = require("./controllers/file")
const productCategoryController = require("./controllers/productCategory")
const extraController = require("./controllers/extra")

/* Setup Restify server and register plugins */
const server = restify.createServer()
server.use(cors())
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
fileController.applyRoutes(server, "/api/file")
extraController.applyRoutes(server, "/api/extra")

/* Serve user submitted files */
server.get("/public/*", restify.plugins.serveStaticFiles("./uploads"))

/* Exports */
module.exports = server
