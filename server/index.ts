import "dotenv/config";
import express from "express";
import authRouter from "./routes/auth/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRouter);

app.listen(process.env.PORT);
