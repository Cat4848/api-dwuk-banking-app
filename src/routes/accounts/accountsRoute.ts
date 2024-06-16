import express from "express";
import createAccountsDatabase from "../../database/DatabasePersistance/AccountsDatabasePersistance/__tests__/helpers/createAccountsDatabase.js";

const accountsRouter = express();

accountsRouter.get("/", async (req, res) => {
  
});

export default accountsRouter;
