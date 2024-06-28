import express from "express";
import createAccountsDatabase from "../../database/DatabasePersistance/AccountsDatabasePersistance/__tests__/helpers/createAccountsDatabase";
import ManualTransactionExecutor from "../../lib/TransactionExecutor/ManualTransactionExecutor/ManualTransactionExecutor";
import createAccountFromAccountRecord from "./helpers/createAccountFromAccountRecord";
import createTransactionsDatabase from "../../database/DatabasePersistance/TransactionsDatabasePersistance/__tests__/helpers/createTransactionsDatabase";
import setHeaders from "../helpers/setHeaders";

const transactionsRouter = express();

transactionsRouter.post("/executeTransaction", async (req, res) => {
  const fromAccountID = Number(req.body.fromAccountID) as number;
  const toAccountID = Number(req.body.toAccountID) as number;
  const amount = Number(req.body.amount) as number;
  try {
    const accountsDatabase = await createAccountsDatabase();
    const fromAccountResult = await accountsDatabase.fetchByID(fromAccountID);
    const accountsDatabase1 = await createAccountsDatabase();
    const toAccountResult = await accountsDatabase1.fetchByID(toAccountID);

    if (!fromAccountResult.success) throw fromAccountResult.error;
    if (!toAccountResult.success) throw toAccountResult.error;

    const fromAccount = await createAccountFromAccountRecord(
      fromAccountResult.data
    );
    const toAccount = await createAccountFromAccountRecord(
      toAccountResult.data
    );

    const manualTransactionExecutor = new ManualTransactionExecutor(
      fromAccount,
      toAccount
    );

    const transactionResult =
      await manualTransactionExecutor.executeTransaction(amount);

    if (!transactionResult.success) throw transactionResult.error;

    return res.json(transactionResult.data);
  } catch (e) {
    if (e instanceof Error) return res.status(404).json(e);
  }
});

transactionsRouter.get("/", async (req, res) => {
  try {
    const transactionsDatabase = await createTransactionsDatabase();
    const transactions = await transactionsDatabase.fetchAll();
    if (transactions.success) {
      setHeaders(res);
      return res.json(transactions.data);
    } else throw new Error(transactions.error.message);
  } catch (e) {
    if (e instanceof Error) return res.status(404).json(e);
  }
  const accountsDatabase = await createAccountsDatabase();
});

export default transactionsRouter;
