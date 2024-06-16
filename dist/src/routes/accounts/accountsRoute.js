import express from "express";
import createAccountsDatabase from "../../database/DatabasePersistance/AccountsDatabasePersistance/__tests__/helpers/createAccountsDatabase.js";
const accountsRouter = express();
accountsRouter.get("/", async (req, res) => {
    try {
        const accountsDatabase = await createAccountsDatabase();
        const accounts = await accountsDatabase.fetchAll();
        if (accounts.success)
            return res.json(accounts.data);
        else
            throw new Error(accounts.error.message);
    }
    catch (e) {
        if (e instanceof Error)
            return res.status(404).json(e);
    }
});
accountsRouter.put("/freeze/:id", async (req, res) => {
    const accountID = Number(req.params.id);
    try {
        const accountsDatabase = await createAccountsDatabase();
        const freezeResult = await accountsDatabase.freeze(accountID);
        if (freezeResult.success)
            return res.json(freezeResult.data);
        else
            throw new Error(freezeResult.error.message);
    }
    catch (e) {
        if (e instanceof Error)
            return res.status(404).json(e);
    }
});
export default accountsRouter;