import DatabaseConnection from "../../../../DatabaseConnection/DatabaseConnection.js";
import AccountsDatabasePersistance from "../../AccountsDatabasePersistance.js";

export default async function createAccountsDatabase() {
  const connection = await DatabaseConnection.createConnection();
  const accountsDatabase = new AccountsDatabasePersistance(connection);
  return accountsDatabase;
}
