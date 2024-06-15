import { ResultGenerator } from "../../../lib/ResultGenerator/ResultGenerator";
export default class AccountsDatabasePersistance {
    connection;
    constructor(connection) {
        this.connection = connection;
    }
    async post(account) {
        const resultGenerator = new ResultGenerator();
        try {
            const [confirmation] = await this.connection.execute(`INSERT INTO accounts VALUES (?,?,?,?,?,?,?,?);`, [
                account.account_id,
                account.customer_id,
                account.officer_id,
                account.open_date,
                account.close_date || null,
                account.last_activity_date,
                account.status,
                account.balance
            ]);
            const success = resultGenerator.generateSuccess(JSON.stringify(confirmation));
            return success;
        }
        catch (e) {
            const error = resultGenerator.generateError(e);
            return error;
        }
        finally {
            await this.connection.end();
        }
    }
    async fetchAll() {
        const resultGenerator = new ResultGenerator();
        try {
            const [accounts] = await this.connection.execute(`SELECT * FROM accounts;`);
            const success = resultGenerator.generateSuccess(JSON.stringify(accounts));
            return success;
        }
        catch (e) {
            const error = resultGenerator.generateError(e);
            return error;
        }
        finally {
            await this.connection.end();
        }
    }
    async fetchByID(accountID) {
        const resultGenerator = new ResultGenerator();
        try {
            const [account] = await this.connection.execute(`SELECT * FROM accounts WHERE account_id = ?;`, [accountID]);
            const success = resultGenerator.generateSuccess(JSON.stringify(account));
            return success;
        }
        catch (e) {
            const error = resultGenerator.generateError(e);
            return error;
        }
        finally {
            await this.connection.end();
        }
    }
    async fetchByCustomerID(customerID) {
        const resultGenerator = new ResultGenerator();
        try {
            const [account] = await this.connection.execute(`SELECT * FROM accounts WHERE customer_id = ?;`, [customerID]);
            const success = resultGenerator.generateSuccess(JSON.stringify(account));
            return success;
        }
        catch (e) {
            const error = resultGenerator.generateError(e);
            return error;
        }
        finally {
            await this.connection.end();
        }
    }
    async freeze(accountID) {
        const resultGenerator = new ResultGenerator();
        try {
            const [confirmation] = await this.connection.execute(`UPDATE accounts SET
          status = "FROZEN"
          WHERE account_id = ?;`, [accountID]);
            const success = resultGenerator.generateSuccess(JSON.stringify(confirmation));
            return success;
        }
        catch (e) {
            const error = resultGenerator.generateError(e);
            return error;
        }
        finally {
            await this.connection.end();
        }
    }
    async close(accountID) {
        const resultGenerator = new ResultGenerator();
        try {
            const [confirmation] = await this.connection.execute(`UPDATE accounts SET
          status = "CLOSED"
          WHERE account_id = ?;`, [accountID]);
            const success = resultGenerator.generateSuccess(JSON.stringify(confirmation));
            return success;
        }
        catch (e) {
            const error = resultGenerator.generateError(e);
            return error;
        }
        finally {
            await this.connection.end();
        }
    }
}
