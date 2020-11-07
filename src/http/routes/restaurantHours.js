const { models } = require('../../db');
const { getIdParam } = require('../utils');

async function getAll(_req, res){
    try {
        const restaurantHours = await models.RestaurantHours.findAll();
        res.send(200, RestaurantHours)
    }catch(error){
        res.status(400, {
            message: error.message
        })
    }
}


async function create(req,res){
    try{
        if (req.body.id) {
            res.send(400, {
                message: 'ID should not be provided, since it is determined automatically by the database.'
            })
        } else {
            const restaurantHours = await models.RestaurantHours.create(req.body);
            res.send(201, restaurantHours);
        }
    }catch(error){
        res.send(400, {
            message: error.message
        })
    }
}



module.exports = {
    getAll,
    create
}