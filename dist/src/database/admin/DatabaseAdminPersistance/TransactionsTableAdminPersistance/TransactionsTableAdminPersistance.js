import { ResultGenerator } from "../../../../lib/ResultGenerator";
export default class TransactionsTableAdminPersistance {
    connection;
    constructor(connection) {
        this.connection = connection;
    }
    async create() {
        const resultGenerator = new ResultGenerator();
        try {
            const [confirmation] = await this.connection.execute(`CREATE TABLE IF NOT EXISTS transactions (
          transaction_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
          from_account_id SMALLINT UNSIGNED NOT NULL,
          to_account_id SMALLINT UNSIGNED NOT NULL,
          officer_id SMALLINT UNSIGNED NOT NULL,
          transaction_date DATETIME NOT NULL,
          amount FLOAT(10,2) UNSIGNED NOT NULL,
          PRIMARY KEY (transaction_id),
          FOREIGN KEY (from_account_id) REFERENCES accounts(account_id),
          FOREIGN KEY (to_account_id) REFERENCES accounts(account_id),
          FOREIGN KEY (officer_id) REFERENCES officers(officer_id)
        );`);
            const success = resultGenerator.generateSuccess(JSON.stringify(confirmation));
            return success;
        }
        catch (e) {
            const error = resultGenerator.generateError(e);
            return error;
        }
    }
}
