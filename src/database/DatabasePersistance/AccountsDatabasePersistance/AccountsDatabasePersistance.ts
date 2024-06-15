import mysql, { ResultSetHeader } from "mysql2/promise";
import { ResultGenerator } from "../../../lib/ResultGenerator/ResultGenerator";
import Account from "../../../lib/Account/Account";
import AccountRecord from "./declaration/AccountRecord";

export default class AccountsDatabasePersistance {
  private connection;

  constructor(connection: mysql.Connection) {
    this.connection = connection;
  }

  async post(account: Account) {
    const resultGenerator = new ResultGenerator();
    try {
      const [confirmation] = await this.connection.execute<ResultSetHeader>(
        `INSERT INTO accounts VALUES (?,?,?,?,?,?,?,?);`,
        [
          account.account_id,
          account.customer_id,
          account.officer_id,
          account.open_date,
          account.close_date || null,
          account.last_activity_date,
          account.status,
          account.balance
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
      const [accounts] = await this.connection.execute<AccountRecord[]>(
        `SELECT * FROM accounts;`
      );

      const success = resultGenerator.generateSuccess(JSON.stringify(accounts));
      return success;
    } catch (e) {
      const error = resultGenerator.generateError(e);
      return error;
    } finally {
      await this.connection.end();
    }
  }

  async fetchByID(accountID: number) {
    const resultGenerator = new ResultGenerator();
    try {
      const [account] = await this.connection.execute<AccountRecord[]>(
        `SELECT * FROM accounts WHERE account_id = ?;`,
        [accountID]
      );

      const success = resultGenerator.generateSuccess(JSON.stringify(account));
      return success;
    } catch (e) {
      const error = resultGenerator.generateError(e);
      return error;
    } finally {
      await this.connection.end();
    }
  }

  async fetchByCustomerID(customerID: number) {
    const resultGenerator = new ResultGenerator();
    try {
      const [account] = await this.connection.execute<AccountRecord[]>(
        `SELECT * FROM accounts WHERE customer_id = ?;`,
        [customerID]
      );

      const success = resultGenerator.generateSuccess(JSON.stringify(account));
      return success;
    } catch (e) {
      const error = resultGenerator.generateError(e);
      return error;
    } finally {
      await this.connection.end();
    }
  }

  async freeze(accountID: number) {
    const resultGenerator = new ResultGenerator();
    try {
      const [confirmation] = await this.connection.execute<ResultSetHeader>(
        `UPDATE accounts SET
          status = "FROZEN"
          WHERE account_id = ?;`,
        [accountID]
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

  async close(accountID: number) {
    const resultGenerator = new ResultGenerator();
    try {
      const [confirmation] = await this.connection.execute<ResultSetHeader>(
        `UPDATE accounts SET
          status = "CLOSED"
          WHERE account_id = ?;`,
        [accountID]
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
  async activate(accountID: number) {
    const resultGenerator = new ResultGenerator();
    try {
      const [confirmation] = await this.connection.execute<ResultSetHeader>(
        `UPDATE accounts SET
          status = "ACTIVE"
          WHERE account_id = ?;`,
        [accountID]
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
