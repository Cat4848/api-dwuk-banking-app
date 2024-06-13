import DatabaseConnection from "../../../DatabaseConnection/DatabaseConnection";
import CustomersTableAdminPersistance from "../CustomersTableAdminPersistance";

test("if customers table created successfully", async () => {
  const connection = await DatabaseConnection.createConnection();
  const customerTable = new CustomersTableAdminPersistance(connection);
  const result = await customerTable.create();
  await connection.end();

  if (!result.success) {
    throw result.error;
  }
  
  expect(result.success).toBe(true);
});
