import { Sequelize } from "sequelize";
    const sequlize = new Sequelize("my_system","root","root",{
    host:"localhost",
    port:3306,
    dialect:"mysql"
});

export const connect_DB = async()=>{
    try {
    await sequlize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
}
export const synctable = async()=>{
    try {
        await sequlize.sync({});
        console.log("Tables synchronized successfully.");
    } catch (error) {
        console.error("Error synchronizing tables:", error);
    }
}
export {sequlize as Sequelize};

