import DatabaseConnection from "../../../../DatabaseConnection/DatabaseConnection";
import TransactionsTableAdminPersistance from "../TransactionsTableAdminPersistance";

test("if the transactions table created successfully", async () => {
  const connection = await DatabaseConnection.createConnection();
  const transactionsTable = new TransactionsTableAdminPersistance(connection);
  const result = await transactionsTable.create();
  await connection.end();

  if (!result.success) {
    throw result.error;
  }

  expect(result.success).toBe(true);
});
