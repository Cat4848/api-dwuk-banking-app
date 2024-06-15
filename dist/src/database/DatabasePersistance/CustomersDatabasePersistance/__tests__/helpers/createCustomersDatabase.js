import DatabaseConnection from "../../../../DatabaseConnection/DatabaseConnection.js";
import CustomersDatabasePersistance from "../../CustomersDatabasePersistance.js";
export default async function createCustomersDatabase() {
    const connection = await DatabaseConnection.createConnection();
    const customersDatabase = new CustomersDatabasePersistance(connection);
    return customersDatabase;
}
