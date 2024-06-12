import "dotenv/config";
import express from "express";
import session from "express-session";
import authRouter from "./src/routes/auth/index.js";
import passport from "passport";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const sessionOptions = {
    secret: process.env.SESSION_SECRET || [],
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
};
if (app.get("env") === "production") {
    sessionOptions.cookie.secure = true;
}
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", authRouter);
app.listen(process.env.PORT || 4000),
    () => {
        console.log("server listening");
    };
