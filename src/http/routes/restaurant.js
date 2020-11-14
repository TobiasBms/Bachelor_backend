const { models } = require('../../db');
const { getIdParam } = require('../utils');

async function getAll(_req, res) {
        const restaurants = await models.Restaurant.findAll();
        res.send(200, restaurants);
};

async function getById(req, res) {
    try{
        const id = getIdParam(req);
        const restaurant = await models.Restaurant.findByPk(id, {
            include: [
                { model: models.City, as: 'city' },
                { model: models.RestaurantCategory, as: 'categories', through: { attributes: [] } },
                { model: models.RestaurantHours, as: 'hours', attributes: { exclude: ['restaurant_id'] } }
            ],
            attributes: { exclude: ['zip_code'] }
        });
        if (restaurant) {
            res.send(200, restaurant); 
        } else {
            res.send(404, {
                message: 'This restaurant does not exist in our database.'
            });
        }
    }catch(error){
        res.send(400, {message: error.message});
    }
};

async function create(req, res) {
    try{
        if (req.body.id) {
            res.send(400, {
                message: 'ID should not be provided, since it is determined automatically by the database.'
            });
        } else {
            const restaurant = await models.Restaurant.create(req.body);
            res.send(201, restaurant);
        }
    }catch(error){
        res.send(400, {
            message: error.message
        });
    }
};

async function update(req, res) {
    
    const id = getIdParam(req);

    // We only accept an UPDATE request if the `:id` param matches the body `id`
    if (req.body.id === id) {
        await models.Restaurant.update(req.body, {
            where: {
                id: id
            }
        });
        res.status(200).end();
    } else {
        res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
    }
};

async function remove(req, res) {
    const id = getIdParam(req);
    await models.Restaurant.destroy({
        where: {
            id: id
        }
    });
    res.status(200).end();
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};