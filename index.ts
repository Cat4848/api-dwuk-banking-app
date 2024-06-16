import express from "express";
import MiddlewareInitializer from "./app.config.js";
import customersRouter from "./src/routes/customers/customersRoute.js";
import accountsRouter from "./src/routes/accounts/accountsRoute.js";

const app = express();

const middleware = new MiddlewareInitializer(app);
middleware.initHTTPBodyParsers();
middleware.initSession();
middleware.initAuth();

app.use("/customers", customersRouter);
app.use("/accounts", accountsRouter);

app.listen(process.env.PORT || 4000);
