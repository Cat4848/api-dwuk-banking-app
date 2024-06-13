import mysql, { ResultSetHeader } from "mysql2/promise";
import { ResultGenerator } from "../../../../lib/ResultGenerator/ResultGenerator";
import { DatabaseAdminPersistance } from "../DatabaseAdminPersistance";

export default class AccountsTableAdminPersistance
  implements DatabaseAdminPersistance
{
  private connection;

  constructor(connection: mysql.Connection) {
    this.connection = connection;
  }

  async create() {
    const resultGenerator = new ResultGenerator();
    try {
      const [confirmation] = await this.connection.execute<ResultSetHeader>(
        `CREATE TABLE IF NOT EXISTS accounts (
          account_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
          customer_id SMALLINT UNSIGNED NOT NULL, 
          officer_id SMALLINT UNSIGNED NOT NULL,
          open_date DATE NOT NULL,
          close_date DATE,
          last_activity_date DATE NOT NULL,
          status ENUM('ACTIVE', 'CLOSED', 'FROZEN') NOT NULL DEFAULT 'ACTIVE',
          balance FLOAT(10,2) NOT NULL DEFAULT 0,
          PRIMARY KEY (account_id),
          FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
          FOREIGN KEY (officer_id) REFERENCES officers(officer_id)
        );`
      );

      const success = resultGenerator.generateSuccess(
        JSON.stringify(confirmation)
      );

      return success;
    } catch (e) {
      const error = resultGenerator.generateError(e);
      return error;
    }
  }
}
