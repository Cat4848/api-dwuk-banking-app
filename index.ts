import express from "express";
import authRouter from "./src/routes/auth/index.js";
import MiddlewareInitializer from "./app.config.js";

const app = express();

const middleware = new MiddlewareInitializer(app);
middleware.initHTTPBodyParsers();
middleware.initSession();
middleware.initAuth();

app.use("/", authRouter);

app.listen(process.env.PORT || 4000);
