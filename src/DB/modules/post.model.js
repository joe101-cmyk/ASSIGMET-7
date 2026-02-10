import { Sequelize } from "../connection.js";
import { usermodel } from "./user.model.js";
import { DataTypes } from "sequelize";
export const postmodel = Sequelize.define("post",{
id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement: true,
},
title:{
    type:DataTypes.STRING(100),
    allowNull:false
},
content :{
    type:DataTypes.TEXT,
    allowNull:false
},
userId:{
    type:DataTypes.INTEGER,

    allowNull:false
},

},
{
    timestamps: true,
    updatestamps: true,
})


usermodel.hasMany(postmodel,{foreignKey:"userId"});
postmodel.belongsTo(usermodel,{foreignKey:"userId"});