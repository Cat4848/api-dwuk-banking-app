import DatabaseConnection from "../../../../DatabaseConnection/DatabaseConnection";
import CustomersDatabasePersistance from "../../CustomersDatabasePersistance";

export default async function createCustomersDatabase() {
  const dbConnection = new DatabaseConnection();
  const connection = await dbConnection.createConnection();
  const customersDatabase = new CustomersDatabasePersistance(connection);
  return customersDatabase;
}
