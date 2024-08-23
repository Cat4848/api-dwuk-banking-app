import DatabaseConnection from "../../../../DatabaseConnection/DatabaseConnection";
import OfficersTableAdminPersistance from "../OfficersTableAdminPersistance";

test("if officers table created successfully", async () => {
  const dbConnection = new DatabaseConnection();
  const connection = await dbConnection.createConnection();
  const officersTable = new OfficersTableAdminPersistance(connection);
  const result = await officersTable.create();
  await connection.end();

  if (!result.success) {
    throw result.error;
  }

  expect(result.success).toBe(true);
});
