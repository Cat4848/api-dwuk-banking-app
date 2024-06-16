import express from "express";
import createCustomersDatabase from "../../database/DatabasePersistance/CustomersDatabasePersistance/__tests__/helpers/createCustomersDatabase.js";
import createCustomerFromHTTPRequest from "./helpers/createCustomerFromHTTPRequest.js";
const customersRouter = express();
customersRouter.get("/", async (req, res) => {
    try {
        const customersDatabase = await createCustomersDatabase();
        const customers = await customersDatabase.fetchAll();
        if (customers.success)
            return res.json(customers.data);
        else
            throw new Error(customers.error.message);
    }
    catch (e) {
        if (e instanceof Error)
            return res.status(404).json(e);
    }
});
customersRouter.put("/:id", async (req, res) => {
    const customer = createCustomerFromHTTPRequest(req);
    try {
        const customersDatabase = await createCustomersDatabase();
        const result = await customersDatabase.put(customer);
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
customersRouter.post("/", async (req, res) => {
    const customer = createCustomerFromHTTPRequest(req);
    try {
        const customersDatabase = await createCustomersDatabase();
        const result = await customersDatabase.post(customer);
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
customersRouter.delete("/:id", async (req, res) => {
    const customerID = Number(req.params.id);
    try {
        const customersDatabase = await createCustomersDatabase();
        const result = await customersDatabase.delete(customerID);
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
export default customersRouter;
