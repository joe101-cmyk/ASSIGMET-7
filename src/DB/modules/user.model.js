import { Sequelize } from "../connection.js";
import { DataTypes } from "sequelize";
export const usermodel = Sequelize.define("user",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        allowNull:false
    },
    firstname:{
        type:DataTypes.STRING(100),
        allowNull:true,
        validate:{
            len:{args:[3,100],
            msg:"firstname should be at least 3 characters"
        }
    }
        
    },
    lastname:{
        type:DataTypes.STRING(100),
        allowNull:true,
            validate:{
            len:{args:[3,100],
            msg:"lastname should be at least 3 characters"
        }
    }
    },
email:{
    type:DataTypes.STRING(100),
    allowNull:true,
    unique:true
},
password:{
    type:DataTypes.STRING(100),
    allowNull:true,
    validate:{
        checkpassword(value){
        if(value.length<8){
            throw new Error("password should be at least 8 characters")
        }
        }
},
},
gender: {
    type:DataTypes.ENUM('male', 'female'),
    allowNull:true
},
DOB:{
    type:DataTypes.DATEONLY,
    allowNull:true
},
confirmemail:{
    type:DataTypes.BOOLEAN,
    allowNull:true,
    defaultValue:true
},
deletedAt: {
    type:DataTypes.DATE,
    allowNull:true
}
}, {
    timestamps: true,
    updatestamps: true,
})



