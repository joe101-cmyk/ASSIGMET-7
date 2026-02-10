import { Sequelize } from "../connection.js";
import { usermodel } from "./user.model.js";
import { postmodel } from "./post.model.js";
import { DataTypes } from "sequelize";
export const commentmodel = Sequelize.define("comment",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    content:{
        type:DataTypes.STRING,
        allowNull:true
    },
    postid:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    userid:{
        type:DataTypes.INTEGER,
        allowNull:true
    },

},{
    timestamps:true,
})

usermodel.hasMany(commentmodel,{foreignKey:"userid", as: "comments"});
commentmodel.belongsTo(usermodel,{foreignKey:"userid", as: "user"});
postmodel.hasMany(commentmodel,{foreignKey:"postid", as: "comments"});
commentmodel.belongsTo(postmodel,{foreignKey:"postid", as: "post"});