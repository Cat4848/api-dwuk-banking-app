import mysql, { ResultSetHeader } from "mysql2/promise";
import { ResultGenerator } from "../../../lib/ResultGenerator/ResultGenerator";
import Account from "../../../lib/Account/Account";
import AccountRecord from "./declaration/AccountRecord";
import AccountJoinCustomer from "./declaration/AccountJoinCustomer";

export default class AccountsDatabasePersistance {
  private connection;

  constructor(connection: mysql.Connection | mysql.Pool) {
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

  async fetchAllJoinCustomers() {
    const resultGenerator = new ResultGenerator();
    try {
      const [accountJoinCustomer] = await this.connection.execute<
        AccountJoinCustomer[]
      >(
        `SELECT 
	        account_id,
          first_name,
          last_name,
          balance,
          open_date,
          last_activity_date,
          status
          FROM accounts 
          INNER JOIN customers 
          USING (customer_id)
          ORDER BY accounts.last_activity_date
          ;`
      );
      const success = resultGenerator.generateSuccess(
        JSON.stringify(accountJoinCustomer)
      );
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
      const [[account]] = await this.connection.execute<AccountRecord[]>(
        `SELECT * FROM accounts WHERE account_id = ?;`,
        [accountID]
      );

      if (!account) {
        throw new Error(
          `The account with accountID ${accountID} does not exist in the database.`
        );
      } else {
        const success = resultGenerator.generateSuccess(
          JSON.stringify(account)
        );
        return success;
      }
    } catch (e) {
      const error = resultGenerator.generateError(e);
      return error;
    }
  }

  async fetchByCustomerID(customerID: number) {
    const resultGenerator = new ResultGenerator();
    try {
      const [account] = await this.connection.execute<AccountRecord[]>(
        `SELECT * FROM accounts WHERE customer_id = ? LIMIT 1;`,
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

  async putBalance(accounts: Account[]) {
    const resultGenerator = new ResultGenerator();
    const confirmationList: ResultSetHeader[] = [];
    try {
      accounts.forEach(async (account) => {
        const [confirmation] = await this.connection.execute<ResultSetHeader>(
          `UPDATE accounts SET balance = ? WHERE account_id = ?;`,
          [account.balance, account.account_id]
        );
        confirmationList.push(confirmation);
      });

      const success = resultGenerator.generateSuccess(
        JSON.stringify(confirmationList)
      );
      return success;
    } catch (e) {
      const error = resultGenerator.generateError(e);
      return error;
    } finally {
      await this.connection.end();
    }
  }

  async freeze(accountsID: number[]) {
    const resultGenerator = new ResultGenerator();

    let successResults = [];
    let errorResults = [];

    for (let accountID of accountsID) {
      const freezeResult = await this.putAccountStatus(accountID, "FROZEN");
      if (freezeResult.success) {
        successResults.push(freezeResult.data);
      } else {
        errorResults.push(freezeResult.error);
      }
    }

    if (!errorResults.length) {
      const success = resultGenerator.generateSuccess(
        JSON.stringify(successResults)
      );
      return success;
    } else {
      const error = resultGenerator.generateError(
        new Error(JSON.stringify(errorResults))
      );
      return error;
    }
  }

  async close(accountsID: number[]) {
    accountsID.forEach((accountID) => {
      return this.putAccountStatus(accountID, "CLOSED");
    });
  }

  async activate(accountsID: number[]) {
    accountsID.forEach((accountID) => {
      return this.putAccountStatus(accountID, "ACTIVE");
    });
  }

  async putAccountStatus(
    accountID: number,
    status: "ACTIVE" | "CLOSED" | "FROZEN"
  ) {
    const resultGenerator = new ResultGenerator();

    if (!this.isAccount(accountID)) {
      const error = resultGenerator.generateError(
        new Error(
          `The account with accountID ${accountID} does not exist in the database.`
        )
      );
      return error;
    }
    
    try {
      const [confirmation] = await this.connection.execute<ResultSetHeader>(
        `UPDATE accounts SET
          status = ?
          WHERE account_id = ?;`,
        [status, accountID]
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

  async isAccount(accountID: number) {
    const account = await this.fetchByID(accountID);
    if (account.success) return true;
    return false;
  }
}
