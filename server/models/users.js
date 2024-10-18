module.exports= (sequelize,datatypes)=> {

    const users = sequelize.define("users",{
        email:{
            type:datatypes.STRING,
            allowNull:false,
            unique:true,
        },
        password: {
            type:datatypes.STRING,
            allowNull:false,
            unique:false,
            
        },
        username:{
            type:datatypes.STRING,
            allowNull:false,
            unique:true,

        },

    })

    users.associate = (models) => {
        users.hasMany(models.posts, {foreignKey:'userId'});
        models.posts.belongsTo(users, {foreignKey:'userId'});

        users.hasMany(models.postsLikes, {foreignKey:'userId'});
        models.postsLikes.belongsTo(users, {foreignKey:'userId'});
        
        users.hasMany(models.postsComments, {foreignKey:'userId'});
        models.postsComments.belongsTo(users, {foreignKey:'userId'});

    }

    return users;
}