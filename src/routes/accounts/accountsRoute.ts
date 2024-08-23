import express from "express";
import createAccountsDatabase from "../../database/DatabasePersistance/AccountsDatabasePersistance/__tests__/helpers/createAccountsDatabase";
import setHeaders from "../helpers/setHeaders";
import createAccountsDatabaseOnPool from "../../database/DatabasePersistance/AccountsDatabasePersistance/__tests__/helpers/createAccountsDatabaseOnPool";

const accountsRouter = express();

accountsRouter.get("/", async (req, res) => {
  try {
    const accountsDatabase = await createAccountsDatabase();
    const accounts = await accountsDatabase.fetchAll();
    if (accounts.success) {
      setHeaders(res);
      return res.json(accounts.data);
    } else throw new Error(accounts.error.message);
  } catch (e) {
    if (e instanceof Error) return res.status(404).json(e);
  }
});

accountsRouter.get("/accountsWithCustomers", async (req, res) => {
  try {
    const accountsDatabase = await createAccountsDatabase();
    const accountsWithCustomers =
      await accountsDatabase.fetchAllJoinCustomers();
    if (accountsWithCustomers.success) {
      setHeaders(res);
      return res.json(accountsWithCustomers.data);
    } else throw new Error(accountsWithCustomers.error.message);
  } catch (e) {
    if (e instanceof Error) return res.status(404).json(e);
  }
});

accountsRouter.get("/:id", async (req, res) => {
  const customerID = Number(req.params.id);
  try {
    const accountsDatabase = await createAccountsDatabase();
    const account = await accountsDatabase.fetchByCustomerID(customerID);
    if (account.success) {
      setHeaders(res);
      return res.json(account.data);
    } else throw new Error(account.error.message);
  } catch (e) {
    if (e instanceof Error) return res.status(404).json(e);
  }
});

accountsRouter.put("/freeze/", async (req, res) => {
  console.log("freezeRoute -> req.body", req.body);
  const accountIDs: number[] = JSON.parse(req.body.accountIDs);
  console.log("freezeRoute -> accountIDs", accountIDs);
  try {
    const accountsDatabase = createAccountsDatabaseOnPool();
    const freezeResults = await accountsDatabase.freeze(accountIDs);

    if (!freezeResults.success) throw freezeResults.error;
    return res.json(freezeResults.data);
  } catch (e) {
    return res.status(404).json(e);
  }
});

export default accountsRouter;
