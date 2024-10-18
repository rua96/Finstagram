module.exports=(sequelize, datatypes) => {
    const postsComments= sequelize.define('postsComments',
        {
            id : {
                type:datatypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            comment : {
                type:datatypes.STRING,
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
            status: {
                type:datatypes.STRING,
                allowNull:false,
                unique:false,
            }


         }
    )
        return postsComments;
    }
        