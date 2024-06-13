import DatabaseConnection from "../../../database/DatabaseConnection/DatabaseConnection";
import OfficersTableAdminPersistance from "../OfficersTableAdminPersistance";

test("if officers table created successfully", async () => {
  const connection = await DatabaseConnection.createConnection();
  const officersTable = new OfficersTableAdminPersistance(connection);
  const result = await officersTable.create();
  await connection.end();
  expect(result.success).toBe(true);
});
