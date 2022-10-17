import { Router } from "express";
import { sessionData } from "../controllers/sessionController.js";
import { tokenValidate } from "../middlewares/authMiddleware.js";

const sessionRoute = Router();

sessionRoute.get("/users/:id", tokenValidate, sessionData);
export default sessionRoute;
