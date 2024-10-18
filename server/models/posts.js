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

    posts.associate=(models) => {
        posts.hasMany(models.postsLikes, {foreignKey: "postId"})
        models.postsLikes.belongsTo(posts, {foreignKey:"postId"})

        posts.hasMany(models.postsComments, {foreignKey: "postId"})
        models.postsComments.belongsTo(posts, {foreignKey:"postId"})
    }
    return posts;
}