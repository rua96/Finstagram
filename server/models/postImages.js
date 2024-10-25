module.exports=(sequelize, datatypes) => {
    const postImages= sequelize.define('postImages',
        {
            originalName : {
                type:datatypes.STRING,
                primaryKey: false,
                autoIncrement: false,
            },
            key : {
                type:datatypes.STRING,
                allowNull: false,
                unique: false,
            },
            size : {
                type:datatypes.BIGINT,
                allowNull:false,
                unique:false,
            },
            postId : {
                type:datatypes.INTEGER,
                allowNull:false,
                unique:false,
            }
        }
    )
        return postImages;
    }
        