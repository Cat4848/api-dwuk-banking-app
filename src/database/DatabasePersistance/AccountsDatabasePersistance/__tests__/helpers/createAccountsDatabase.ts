import DatabaseConnection from "../../../../DatabaseConnection/DatabaseConnection";
import AccountsDatabasePersistance from "../../AccountsDatabasePersistance";

export default async function createAccountsDatabase() {
  const dbConnection = new DatabaseConnection();
  const connection = await dbConnection.createConnection();
  const accountsDatabase = new AccountsDatabasePersistance(connection);
  return accountsDatabase;
}
