import DatabaseConnection from "../../DatabaseConnection/DatabaseConnection";
import CustomersDatabasePersistance from "../CustomersDatabasePersistance";
import Customer from "../../../lib/Customer/Customer";
import IDGenerator from "../../../lib/IDGenerator/IDGenerator";

test("if a customer has been added successfully to the database", async () => {
  const connection = await DatabaseConnection.createConnection();
  const customersDatabase = new CustomersDatabasePersistance(connection);

  const customer = new Customer({
    customer_id: IDGenerator.smallIntRandomID(),
    officer_id: 1,
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@gmail.com"
  });

  const result = await customersDatabase.post(customer);

  if (!result.success) {
    throw result.error;
  }

  expect(result.success).toBe(true);
});

test("if fetched all customers from database", async () => {
  const connection = await DatabaseConnection.createConnection();
  const customersDatabase = new CustomersDatabasePersistance(connection);
  const result = await customersDatabase.fetchAll();

  if (!result.success) {
    throw result.error;
  }

  expect(result.success).toBe(true);
});

test("if the database customer record is updated successfully", async () => {
  const connection = await DatabaseConnection.createConnection();
  const customersDatabase = new CustomersDatabasePersistance(connection);

  const customer = new Customer({
    customer_id: 4935,
    officer_id: 1,
    first_name: "James",
    last_name: "Black",
    email: "jane.black@gmail.com"
  });
  const result = await customersDatabase.put(customer);

  if (!result.success) {
    throw result.error;
  }

  expect(result.success).toBe(true);
});
