import "dotenv/config";
import express from "express";
import authRouter from "./src/routes/auth/index.js";
import passport from "passport";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRouter);

app.listen(process.env.PORT);
