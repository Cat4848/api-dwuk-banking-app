import express from "express";
import createAccountsDatabase from "../../database/DatabasePersistance/AccountsDatabasePersistance/__tests__/helpers/createAccountsDatabase.js";
import ManualTransactionExecutor from "../../lib/TransactionExecutor/ManualTransactionExecutor/ManualTransactionExecutor.js";
import createAccountFromAccountRecord from "./helpers/createAccountFromAccountRecord.js";
const transactionsRouter = express();
transactionsRouter.post("/executeTransaction", async (req, res) => {
    const fromAccountID = Number(req.body.fromAccountID);
    const toAccountID = Number(req.body.toAccountID);
    const amount = Number(req.body.amount);
    try {
        const accountsDatabase = await createAccountsDatabase();
        const fromAccountResult = await accountsDatabase.fetchByID(fromAccountID);
        const accountsDatabase1 = await createAccountsDatabase();
        const toAccountResult = await accountsDatabase1.fetchByID(toAccountID);
        if (!fromAccountResult.success)
            throw fromAccountResult.error;
        if (!toAccountResult.success)
            throw toAccountResult.error;
        const fromAccount = await createAccountFromAccountRecord(fromAccountResult.data);
        const toAccount = await createAccountFromAccountRecord(toAccountResult.data);
        const manualTransactionExecutor = new ManualTransactionExecutor(fromAccount, toAccount);
        const transactionResult = await manualTransactionExecutor.executeTransaction(amount);
        if (!transactionResult.success)
            throw transactionResult.error;
        return res.json(transactionResult.data);
    }
    catch (e) {
        if (e instanceof Error)
            return res.status(404).json(e);
    }
});
export default transactionsRouter;
