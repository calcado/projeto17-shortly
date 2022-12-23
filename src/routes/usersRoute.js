import {Router} from "express";
import {getUser, getRanking} from "../controllers/usersController.js"
const userRoute = Router();

userRoute.get("/users/me", getUser);
userRoute.get("/ranking", getRanking);

export default userRoute;