import mysql, { ResultSetHeader } from "mysql2/promise";
import { ResultGenerator } from "../../../lib/ResultGenerator/ResultGenerator";
import Transaction from "../../../lib/Transaction/Transaction";
import TransactionRecord from "./declaration/TransactionRecord";

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

  async fetchAll() {
    const resultGenerator = new ResultGenerator();
    try {
      const [transactions] = await this.connection.execute<TransactionRecord[]>(
        `SELECT * FROM transactions;`
      );

      const success = resultGenerator.generateSuccess(
        JSON.stringify(transactions)
      );
      return success;
    } catch (e) {
      const error = resultGenerator.generateError(e);
      return error;
    } finally {
      await this.connection.end();
    }
  }

  async fetchByID(transactionID: number) {
    const resultGenerator = new ResultGenerator();
    try {
      const [transaction] = await this.connection.execute<TransactionRecord[]>(
        `SELECT * FROM transactions WHERE transaction_id = ?;`,
        [transactionID]
      );

      const success = resultGenerator.generateSuccess(
        JSON.stringify(transaction)
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
