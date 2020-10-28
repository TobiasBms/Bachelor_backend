const Router = require('express');
const restaurantRouteGroup = Router();
const restaurantController = require('../../controllers/restaurant');

restaurantRouteGroup
.route("/restaurants")
.get(restaurantController.getMany)

restaurantRouteGroup
.route("/restaurant")
.get(restaurantController.getOne);

module.exports = restaurantRouteGroup;