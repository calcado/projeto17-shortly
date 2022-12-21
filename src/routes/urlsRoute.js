import {Router} from "express";

const urlsRoute = Router();

urlsRoute.post("/urls/shorten", postUrlsShorten);
urlsRoute.get("/urls/:id", getUrlsId);
urlsRoute.get("/urls/open/:shortUrl", getShortUrl);
urlsRoute.delete("/urls/:id", deleteUrls);

export default urlsRoute;