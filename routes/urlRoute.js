import { Router } from "express";
import {
  linkShortener,
  urlRedirect,
  getRequestedLink,
} from "../controllers/urlController.js";
import { tokenValidate } from "../middlewares/authMiddleware.js";
import { LinkValidation } from "../middlewares/ulrMiddleware.js";
const linkRoute = Router();

linkRoute.post("/urls/shorten", tokenValidate, LinkValidation, linkShortener);
linkRoute.get("/urls/:id", getRequestedLink);
linkRoute.get("/urls/open/:shortUrl", urlRedirect);
export default linkRoute;
