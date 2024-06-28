import express from "express";
import cors from "cors";
import MiddlewareInitializer from "./app.config";
import customersRouter from "./routes/customers/customersRoute";
import accountsRouter from "./routes/accounts/accountsRoute";
import transactionsRouter from "./routes/transactions/transactionsRoute";

const app = express();

app.use(cors());
app.options("*", cors());

const middleware = new MiddlewareInitializer(app);
middleware.initHTTPBodyParsers();
middleware.initSession();
middleware.initAuth();

app.use("/customers", customersRouter);
app.use("/accounts", accountsRouter);
app.use("/transactions", transactionsRouter);

app.listen(process.env.PORT || 4000);
