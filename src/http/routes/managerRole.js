const { models } = require('../../db');
const { getIdParam } = require('../utils');

async function getAll(_req, res) {
        const role = await models.ManagerRole.findAll({
            include: [
                { model: models.Privilege },
            ],
        });
        res.send(200, role);
};

async function create(req, res) {
    try{
        if (req.body.id) {
            res.send(400, {
                message: 'ID should not be provided, since it is determined automatically by the database.'
            })
        } else {
            const role = await models.ManagerRole.create(req.body);
            res.send(201, role);
        }
    }catch(error){
        res.send(400, {
            message: error.message
        })
    }
};

async function update(req, res) {
    const id = getIdParam(req);
    if (req.body.id === id) {
        await models.ManagerRole.update(req.body, {
            where: {
                id: id
            }
        });
        res.send(200);
    } else {
        res.send(400, {
            message: `Bad request: param ID (${id}) does not match body ID (${req.body.id}).`
        });
    }
};

async function remove(req, res) {
    const id = getIdParam(req);
    await models.ManagerRole.destroy({
        where: {
            id: id
        }
    });
    res.send(200);
};

module.exports = {
    getAll,
    create,
    update,
    remove,
};