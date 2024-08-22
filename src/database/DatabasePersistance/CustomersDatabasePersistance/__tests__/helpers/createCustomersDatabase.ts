import DatabaseConnection from "../../../../DatabaseConnection/DatabaseConnection";
import CustomersDatabasePersistance from "../../CustomersDatabasePersistance";

export default async function createCustomersDatabase() {
  const dbConn = new DatabaseConnection();
  const connection = await dbConn.createConnection();
  const customersDatabase = new CustomersDatabasePersistance(connection);
  return customersDatabase;
}
