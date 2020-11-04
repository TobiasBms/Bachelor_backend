
const getOne = (model) => async (req, res) =>  {
    try{
        let restaurant = await model.findByPk(req.params.id);
        if(!restaurant){
            return res.status(400).json("error");
        }

        return res.status(200).json({data: restaurant})

    } catch(e){
        console.error(e);
    } 
}


const getMany = (model) => async (req,res) => {
    try{
        let restaurants = await model.findAll();
        if(!restaurants){
            return res.status(400).end("error");
        }

        return res.status(200).json({data: restaurants});

    }catch(e){
        console.error(e);
    }
}


const crudController = (model,sequelize) => ({
    getOne: getOne(model(sequelize)),
    getMany: getMany(model(sequelize))
})
 

module.exports = crudController;