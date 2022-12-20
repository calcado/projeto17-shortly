import {Router} from "express";

const userRouter = Router();

userRouter.get("/users/me", getUsers);
userRouter.get("/ranking", getRanking);

export default userRouter;