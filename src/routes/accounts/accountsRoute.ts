import express from "express";
import createAccountsDatabase from "../../database/DatabasePersistance/AccountsDatabasePersistance/__tests__/helpers/createAccountsDatabase";
import setHeaders from "../helpers/setHeaders";
import handlePutAccountStatus from "./helpers/handlePutAccountStatus";
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

accountsRouter.put("/activate", async (req, res) => {
  handlePutAccountStatus(req, res, "activate");
});

accountsRouter.put("/close", async (req, res) => {
  handlePutAccountStatus(req, res, "close");
});

accountsRouter.put("/freeze", async (req, res) => {
  handlePutAccountStatus(req, res, "freeze");
});

accountsRouter.put("/balance", async (req, res) => {
  console.log("req.body", req.body);
  const accountID: string = JSON.parse(req.body.accountID);
  const amount: string = JSON.parse(req.body.amount);
  console.log("accountID", accountID);
  console.log("balance", amount);

  try {
    const accountsDatabase = createAccountsDatabaseOnPool();
    const result = await accountsDatabase.putBalance(
      Number(accountID),
      Number(amount)
    );

    if (!result.success) throw result.error;
    return res.json(result.data);
  } catch (e) {
    return res.status(404).json(e);
  }
});
export default accountsRouter;
