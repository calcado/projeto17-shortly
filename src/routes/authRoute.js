import {Router} from "express"
import {postSignIn,postSignUp} from "../controllers/authController.js";
import {signUpValidation, signInValidation} from "../middlewares/authValidationMiddleware.js"

const authRoute = Router();

authRoute.post("/signup",signUpValidation, postSignUp);
authRoute.post("/singin",signInValidation, postSignIn);

export default authRoute;