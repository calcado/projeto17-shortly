import {Router} from "express";
import {getUser, getRanking} from "../controllers/usersController.js"
import { tokenValidation } from "../middlewares/tokenValidationmiddleware.js";
const userRoute = Router();

userRoute.get("/users/me",tokenValidation, getUser);
userRoute.get("/ranking", getRanking);

export default userRoute;