import mysql, { ResultSetHeader } from "mysql2/promise";
import { ResultGenerator } from "../../../lib/ResultGenerator";
import { DatabaseAdminPersistance } from "../DatabaseAdminPersistance/DatabaseAdminPersistance";

export default class CustomersTableAdminPersistance
  implements DatabaseAdminPersistance
{
  private connection;

  constructor(connection: mysql.Connection) {
    this.connection = connection;
  }

  async create() {
    const resultGenerator = new ResultGenerator();
    try {
      const [confirmation] = await  this.connection.execute<ResultSetHeader>(
        `CREATE TABLE IF NOT EXISTS customers (
          
        );`
      )
    } catch(e) {

    }
  }
}
