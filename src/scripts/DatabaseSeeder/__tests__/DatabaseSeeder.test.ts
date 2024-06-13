import DatabaseConnection from "../../../database/DatabaseConnection/DatabaseConnection";
import DatabaseSeeder from "../DatabaseSeeder";

test("if officers table created successfully", async () => {
  const connection = await DatabaseConnection.createConnection();
  const dbSeeder = new DatabaseSeeder(connection);
  await dbSeeder.initOfficersTable();
  await dbSeeder.seedOfficersTable();
  await connection.end();
});
