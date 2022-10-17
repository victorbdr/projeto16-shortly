import { Router } from "express";
import { sessionData, usersRank } from "../controllers/sessionController.js";
import { tokenValidate } from "../middlewares/authMiddleware.js";

const sessionRoute = Router();

sessionRoute.get("/users/:id", tokenValidate, sessionData);
sessionRoute.get("/ranking", usersRank);
export default sessionRoute;
