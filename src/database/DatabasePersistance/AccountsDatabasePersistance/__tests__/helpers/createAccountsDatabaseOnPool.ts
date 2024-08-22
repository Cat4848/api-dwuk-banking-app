import DatabaseConnection from "../../../../DatabaseConnection/DatabaseConnection";
import AccountsDatabasePersistance from "../../AccountsDatabasePersistance";

export default function createAccountsDatabaseOnPool() {
  const dbConn = new DatabaseConnection();
  const pool = dbConn.createPool();
  const accountsDatabase = new AccountsDatabasePersistance(pool);
  return accountsDatabase;
}
