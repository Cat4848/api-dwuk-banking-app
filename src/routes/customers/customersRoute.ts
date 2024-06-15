import express from "express";
import createCustomersDatabase from "../../database/DatabasePersistance/CustomersDatabasePersistance/__tests__/helpers/createCustomersDatabase.js";

const customersRouter = express();

customersRouter.get("/", async (req, res) => {
  const customersDatabase = await createCustomersDatabase();
  const customers = await customersDatabase.fetchAll();
  if (customers.success) {
    return res.json(customers);
  } else {
    return res.status(404).json(customers.error);
  }
});

export default customersRouter;
