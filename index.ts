import express from "express";
import session from "express-session";
import createSessionOptions from "./production.config.js";
import authRouter from "./src/routes/auth/index.js";
import passport from "passport";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(createSessionOptions(app)));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRouter);

app.listen(process.env.PORT || 4000);
