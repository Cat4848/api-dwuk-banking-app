import DatabaseConnection from "../../../DatabaseConnection/DatabaseConnection";
import CustomersDatabasePersistance from "../../CustomersDatabasePersistance";

export default async function createCustomersDatabase() {
  const connection = await DatabaseConnection.createConnection();
  const customersDatabase = new CustomersDatabasePersistance(connection);
  return customersDatabase;
}
