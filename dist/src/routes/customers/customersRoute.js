import express from "express";
import createCustomersDatabase from "../../database/DatabasePersistance/CustomersDatabasePersistance/__tests__/helpers/createCustomersDatabase.js";
import Customer from "../../lib/Customer/Customer.js";
import officerID from "../../lib/constants/officerID.js";
const customersRouter = express();
customersRouter.get("/", async (req, res) => {
    console.log("get customers check 1");
    const customersDatabase = await createCustomersDatabase();
    const customers = await customersDatabase.fetchAll();
    if (customers.success) {
        return res.json(customers.data);
    }
    else {
        return res.status(404).json(customers.error);
    }
});
customersRouter.put("/:id", async (req, res) => {
    const customerFromFrontEnd = req.body;
    const customer = new Customer({
        customer_id: Number(req.params.id),
        officer_id: officerID,
        first_name: customerFromFrontEnd.first_name,
        last_name: customerFromFrontEnd.last_name,
        email: customerFromFrontEnd.email
    });
    try {
        const customersDatabase = await createCustomersDatabase();
        const result = await customersDatabase.put(customer);
        if (result.success) {
            return res.json(result.data);
        }
        else {
            throw new Error(result.error.message);
        }
    }
    catch (e) {
        if (e instanceof Error) {
            return res.status(404).json(e);
        }
    }
});
export default customersRouter;
