import {Router} from "express"

const authRouter = Router();

authRouter.post("/signup", postSignUp);
authRouter.post("/singin", postSignIn);

export default authRouter