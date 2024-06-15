import { ResultGenerator } from "../../../lib/ResultGenerator/ResultGenerator";
export default class TransactionsDatabasePersistance {
    connection;
    constructor(connection) {
        this.connection = connection;
    }
    async post(transaction) {
        const resultGenerator = new ResultGenerator();
        try {
            const [confirmation] = await this.connection.execute(`INSERT INTO transactions VALUES (?,?,?,?,?,?);`, [
                transaction.transaction_id,
                transaction.from_account_id,
                transaction.to_account_id,
                transaction.officer_id,
                transaction.transaction_date,
                transaction.amount
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
    async fetchByID(transactionID) {
        const resultGenerator = new ResultGenerator();
        try {
            const [transaction] = await this.connection.execute(`SELECT * FROM transactions WHERE transaction_id = ?;`, [transactionID]);
            const success = resultGenerator.generateSuccess(JSON.stringify(transaction));
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
