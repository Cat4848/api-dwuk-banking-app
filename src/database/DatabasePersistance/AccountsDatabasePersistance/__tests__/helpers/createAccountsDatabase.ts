import DatabaseConnection from "../../../../DatabaseConnection/DatabaseConnection";
import AccountsDatabasePersistance from "../../AccountsDatabasePersistance";

export default async function createAccountsDatabase() {
  const dbConn = new DatabaseConnection();
  const connection = await dbConn.createConnection();
  const accountsDatabase = new AccountsDatabasePersistance(connection);
  return accountsDatabase;
}
