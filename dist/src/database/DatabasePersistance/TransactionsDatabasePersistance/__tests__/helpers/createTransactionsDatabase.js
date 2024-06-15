import DatabaseConnection from "../../../../DatabaseConnection/DatabaseConnection.js";
import TransactionsDatabasePersistance from "../../TransactionsDatabasePersistance.js";
export default async function createTransactionsDatabase() {
    const connection = await DatabaseConnection.createConnection();
    const transactionsDatabase = new TransactionsDatabasePersistance(connection);
    return transactionsDatabase;
}
