import express from "express";
import createCustomersDatabase from "../../database/DatabasePersistance/CustomersDatabasePersistance/__tests__/helpers/createCustomersDatabase";
import createCustomerFromHTTPRequest from "./helpers/createCustomerFromHTTPRequest";
import setHeaders from "../helpers/setHeaders";

const customersRouter = express();

customersRouter.get("/", async (req, res) => {
  try {
    const customersDatabase = await createCustomersDatabase();
    const customers = await customersDatabase.fetchAll();
    if (customers.success) {
      setHeaders(res);
      return res.json(customers.data);
    } else throw new Error(customers.error.message);
  } catch (e) {
    if (e instanceof Error) return res.status(404).json(e);
  }
});

customersRouter.put("/:id", async (req, res) => {
  const customer = createCustomerFromHTTPRequest(req);
  try {
    const customersDatabase = await createCustomersDatabase();
    const putResult = await customersDatabase.put(customer);
    if (putResult.success) return res.json(putResult.data);
    else throw new Error(putResult.error.message);
  } catch (e) {
    if (e instanceof Error) return res.status(404).json(e);
  }
});

customersRouter.post("/", async (req, res) => {
  const customer = createCustomerFromHTTPRequest(req);
  try {
    const customersDatabase = await createCustomersDatabase();
    const postResult = await customersDatabase.post(customer);
    if (postResult.success) {
      setHeaders(res);
      return res.json(postResult.data);
    } else throw new Error(postResult.error.message);
  } catch (e) {
    if (e instanceof Error) return res.status(404).json(e);
  }
});

customersRouter.delete("/:id", async (req, res) => {
  const customerID = Number(req.params.id);
  try {
    const customersDatabase = await createCustomersDatabase();
    const deleteResult = await customersDatabase.delete(customerID);
    if (deleteResult.success) return res.json(deleteResult.data);
    else throw new Error(deleteResult.error.message);
  } catch (e) {
    if (e instanceof Error) return res.status(404).json(e);
  }
});

export default customersRouter;
