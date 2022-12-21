import {Router} from "express";

const userRoute = Router();

userRoute.get("/users/me", getUser);
userRoute.get("/ranking", getRanking);

export default userRoute;