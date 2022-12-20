import {Router} from "express";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", postUrlsShorten);
urlsRouter.get("/urls/:id", getUrlsId);
urlsRouter.get("/urls/open/:shortUrl", getShortUrl);
urlsRouter.delete("/urls/:id", deleteUrls);

export default urlsRouter;