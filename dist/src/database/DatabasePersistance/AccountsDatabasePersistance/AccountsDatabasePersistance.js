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
}
