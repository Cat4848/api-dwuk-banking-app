import mysql, { ResultSetHeader } from "mysql2/promise";
import { ResultGenerator } from "../../../lib/ResultGenerator/ResultGenerator";
import Transaction from "../../../lib/Transaction/Transaction";

export default class TransactionsDatabasePersistance {
  private connection;

  constructor(connection: mysql.Connection) {
    this.connection = connection;
  }

  async post(transaction: Transaction) {
    const resultGenerator = new ResultGenerator();
    try {
      const [confirmation] = await this.connection.execute<ResultSetHeader>(
        `INSERT INTO transactions VALUES (?,?,?,?,?,?);`,
        [
          transaction.transaction_id,
          transaction.from_account_id,
          transaction.to_account_id,
          transaction.officer_id,
          transaction.transaction_date,
          transaction.amount
        ]
      );

      const success = resultGenerator.generateSuccess(
        JSON.stringify(confirmation)
      );
      return success;
    } catch (e) {
      const error = resultGenerator.generateError(e);
      return error;
    } finally {
      await this.connection.end();
    }
  }
}
