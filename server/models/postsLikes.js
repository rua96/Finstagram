module.exports=(sequelize, datatypes) => {
    const postsLikes= sequelize.define('postsLikes',
        {
            id : {
                type:datatypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            like : {
                type:datatypes.BOOLEAN,
                allowNull: false,
                unique: false,
            },
            postId : {
                type:datatypes.INTEGER,
                allowNull:false,
                unique:false,
            },
            userId : {
                type:datatypes.INTEGER,
                allowNull:false,
                unique:false,
            },


         }
    )
        return postsLikes;
    }
        