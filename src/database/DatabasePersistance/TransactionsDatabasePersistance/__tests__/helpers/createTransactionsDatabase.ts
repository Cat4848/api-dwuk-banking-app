import DatabaseConnection from "../../../../DatabaseConnection/DatabaseConnection";
import TransactionsDatabasePersistance from "../../TransactionsDatabasePersistance";

export default async function createTransactionsDatabase() {
  const dbConnection = new DatabaseConnection();
  const connection = await dbConnection.createConnection();
  const transactionsDatabase = new TransactionsDatabasePersistance(connection);
  return transactionsDatabase;
}
