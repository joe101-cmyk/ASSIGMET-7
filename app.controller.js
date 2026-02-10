import { blogRouter, userRouter, postRouter, commentRouter } from "../ORM/src/modules/index.js";
import dotenv  from "dotenv";
import { usermodel } from "./src/DB/modules/user.model.js";
import { postmodel } from "./src/DB/modules/post.model.js";
import { commentmodel } from "./src/DB/modules/comment.model.js";
import {connect_DB, synctable} from "./src/DB/connection.js";
dotenv.config ({path:"ORM/src/config/dev.env"});
await connect_DB();
await synctable();
const bootstrap = async(app,express)=>{
app.use(express.json());    
app.use("/blogs",blogRouter);
app.use("/users",userRouter);
app.use("/posts",postRouter);
app.use("/comments",commentRouter);
}

try {
    const user = await usermodel.create({
    firstname:"Alice",
    lastname:"Dsjohn",
    email:Date.now()+"@example.com",
    password:"password123"
    });
    
} catch (error) {
    console.log(error);
    
}

export default bootstrap;