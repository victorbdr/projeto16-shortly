import { Router } from "express";
import { signIn,signUp } from "../controllers/authController.js";
import { signInValidate,signUpValidate } from "../middlewares/authMiddleware.js";

const authRoute = Router();
authRoute.post("/signup", signUpValidate, signUp)
authRoute.post("/signin", signInValidate, signIn)

export default authRoute