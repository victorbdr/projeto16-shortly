import { Router } from "express";
import { linkShortener } from "../controllers/urlController.js";
import { tokenValidate } from "../middlewares/authMiddleware.js";
import { getRequestedLink } from "../controllers/urlController.js";
import { LinkValidation } from "../middlewares/ulrMiddleware.js";
const linkRoute = Router();

linkRoute.post("/urls/shorten", tokenValidate, LinkValidation, linkShortener);
linkRoute.get("/urls/:id", getRequestedLink)
export default linkRoute;
