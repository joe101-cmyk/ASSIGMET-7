import { Router} from "express";
import * as userService from "./user.service.js";


const router = Router();

        router.post("/signup",userService.signup);
        router.put("/:id",userService.updateuser);
        router.get("/email/:email",userService.getemail);
            router.get("/users",userService.getUsers);
export default router;