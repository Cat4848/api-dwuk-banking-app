import DatabaseConnection from "../../../../DatabaseConnection/DatabaseConnection";
import AccountsDatabasePersistance from "../../AccountsDatabasePersistance";

export default async function createAccountsDatabase() {
  const connection = await DatabaseConnection.createConnection();
  const accountsDatabase = new AccountsDatabasePersistance(connection);
  return accountsDatabase;
}
