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
  const accountsID: number[] = JSON.parse(req.body.accountsIds as string);
  try {
    const accountsDatabase = createAccountsDatabaseOnPool();
    const freezeResults = await accountsDatabase.freeze(accountsID);

    let success = "";
    let error = "";

    for (let freezeResult of freezeResults) {
      if (!freezeResult.success) error = freezeResult.error.message;
      else success += freezeResult.data;
    }

    if (!error) return res.json(success);
    else throw new Error(error);
  } catch (e) {
    if (e instanceof Error) return res.status(404).json(e);
  }
});

// accountsRouter.put("/close/:id", async (req, res) => {
//   const accountID = Number(req.params.id);
//   try {
//     const accountsDatabase = await createAccountsDatabase();
//     const closeResult = await accountsDatabase.close(accountID);
//     if (closeResult.success) return res.json(closeResult.data);
//     else throw new Error(closeResult.error.message);
//   } catch (e) {
//     if (e instanceof Error) return res.status(404).json(e);
//   }
// });

// accountsRouter.put("/activate/:id", async (req, res) => {
//   console.log("req.body put activate", req.body);
//   const accountID = Number(req.params.id);
//   try {
//     const accountsDatabase = await createAccountsDatabase();
//     const activateResult = await accountsDatabase.activate(accountID);
//     if (activateResult.success) return res.json(activateResult.data);
//     else throw new Error(activateResult.error.message);
//   } catch (e) {
//     if (e instanceof Error) return res.status(404).json(e);
//   }
// });

export default accountsRouter;
