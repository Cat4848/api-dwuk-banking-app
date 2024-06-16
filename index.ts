import express from "express";
import cors from "cors";
import MiddlewareInitializer from "./app.config.js";
import customersRouter from "./src/routes/customers/customersRoute.js";
import accountsRouter from "./src/routes/accounts/accountsRoute.js";
import transactionsRouter from "./src/routes/transactions/transactionsRoute.js";

const app = express();

const middleware = new MiddlewareInitializer(app);
middleware.initHTTPBodyParsers();
middleware.initSession();
middleware.initAuth();

app.use(function (req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Expose-Headers", "ETag");
  next();
});

app.use(
  cors({
    credentials: true,
    origin: "https://api-dwuk-banking-app-2c5a96dde0e1.herokuapp.com"
  })
);

app.use("/customers", customersRouter);
app.use("/accounts", accountsRouter);
app.use("/transactions", transactionsRouter);

app.listen(process.env.PORT || 4000);
