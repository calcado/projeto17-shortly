import {Router} from "express";
import {postUrlValidation} from "../middlewares/urlValidationMiddleware.js"
import {postUrlsShorten, getUrlsId,getShortUrl,deleteUrls} from "../controllers/urlsController.js"
import { tokenValidation } from "../middlewares/tokenValidationmiddleware.js";

const urlsRoute = Router();

urlsRoute.post("/urls/shorten", tokenValidation, postUrlValidation ,postUrlsShorten);
urlsRoute.get("/urls/:id", getUrlsId);
urlsRoute.get("/urls/open/:shortUrl", getShortUrl);
urlsRoute.delete("/urls/:id", tokenValidation, deleteUrls);

export default urlsRoute;