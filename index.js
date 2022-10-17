import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import linkRoute from "./routes/urlRoute.js";
import sessionRoute from "./routes/sessionRoute.js";
import "express-async-errors";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use(authRoute);
app.use(linkRoute);
app.use(sessionRoute);

app.listen(process.env.PORT, () =>
  console.log(`server working on port ${process.env.PORT}`)
);
