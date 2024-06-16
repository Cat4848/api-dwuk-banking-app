import express from "express";
import createAccountsDatabase from "../../database/DatabasePersistance/AccountsDatabasePersistance/__tests__/helpers/createAccountsDatabase.js";
const accountsRouter = express();
accountsRouter.get("/", async (req, res) => {
    try {
        const accountsDatabase = await createAccountsDatabase();
        const result = await accountsDatabase.fetchAll();
        if (result.success)
            return res.json(result.data);
        else
            throw new Error(result.error.message);
    }
    catch (e) {
        if (e instanceof Error)
            return res.status(404).json(e);
    }
});
export default accountsRouter;
