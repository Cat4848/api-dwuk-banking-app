import DatabaseConnection from "../../../../DatabaseConnection/DatabaseConnection";
import TransactionsDatabasePersistance from "../../TransactionsDatabasePersistance";
export default async function createTransactionsDatabase() {
    const connection = await DatabaseConnection.createConnection();
    const transactionsDatabase = new TransactionsDatabasePersistance(connection);
    return transactionsDatabase;
}
