import express from "express";
import createAccountsDatabase from "../../database/DatabasePersistance/AccountsDatabasePersistance/__tests__/helpers/createAccountsDatabase.js";

const accountsRouter = express();

accountsRouter.get("/", async (req, res) => {
  try {
    const accountsDatabase = await createAccountsDatabase();
    const accounts = await accountsDatabase.fetchAll();
    if (accounts.success) return res.json(accounts.data);
    else throw new Error(accounts.error.message);
  } catch (e) {
    if (e instanceof Error) return res.status(404).json(e);
  }
});

export default accountsRouter;
