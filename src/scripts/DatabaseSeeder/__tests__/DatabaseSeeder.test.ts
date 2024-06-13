import DatabaseConnection from "../../../database/DatabaseConnection/DatabaseConnection";
import OfficersTableAdminPersistance from "../DatabaseSeeder";

test("if officers table created successfully", async () => {
  const connection = await DatabaseConnection.createConnection();
  const officersTable = new OfficersTableAdminPersistance(connection);
  await officersTable.create();
  await connection.end();
});
