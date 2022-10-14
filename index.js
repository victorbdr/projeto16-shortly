import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use(authRoute)

app.listen(process.env.PORT, () =>
  console.log(`server working on port ${process.env.PORT}`)
);