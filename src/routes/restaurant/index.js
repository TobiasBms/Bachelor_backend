const Router = require('express');
const restaurantRouteGroup = Router();
const restaurantController = require('../../controllers/restaurant');

restaurantRouteGroup
    .get("/restaurant", restaurantController.getMany)
    .get("/restaurant/:id", restaurantController.getOne);

restaurantCategoryRouteGroup
    .get('restaurantCategory', restaurantCategoryRouteGroup.getMany)
    .get('restaurantCategory/:id', restaurantCategoryRouteGroup.getOne);

module.exports = restaurantRouteGroup;