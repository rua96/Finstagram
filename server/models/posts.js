module.exports= (sequelize,datatypes)=> {

    const posts = sequelize.define("posts",{
        title:{
            type:datatypes.STRING,
            allowNull:false,
            unique:false,
        },
        description: {
            type:datatypes.STRING,
            allowNull:false,
            unique:false,
        },
        status: {
            type:datatypes.STRING,
            allowNull:true,
            unique:false,
        }
     })
    return posts;
}