const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define('Restaurant', {
        name: DataTypes.STRING,
        zip_code: DataTypes.CHAR,
        city: DataTypes.STRING,
        address:DataTypes.STRING,
        registered_at: DataTypes.DATE,  
        location: DataTypes.GEOGRAPHY, 
        phone: DataTypes.CHAR, 
        email: DataTypes.STRING, 
        website: DataTypes.STRING, 
        image_logo: DataTypes.STRING, 
        image_banner: DataTypes.STRING, 
        description: DataTypes.TEXT, 
        smiley_id: DataTypes.NUMBER
    },
    {
        timestamps: false,
        tableName: 'RestaurantView'
    }
    
    )
}
