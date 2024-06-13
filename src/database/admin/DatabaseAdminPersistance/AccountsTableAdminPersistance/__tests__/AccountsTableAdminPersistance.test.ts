import DatabaseConnection from "../../../../DatabaseConnection/DatabaseConnection";
import AccountsTableAdminPersistance from "../AccountsTableAdminPersistance";

test("if accounts table created successfully", async () => {
  const connection = await DatabaseConnection.createConnection();
  const accountsTable = new AccountsTableAdminPersistance(connection);
  const result = await accountsTable.create();
  await connection.end();

  if (!result.success) {
    throw result.error;
  }

  expect(result.success).toBe(true);
});
