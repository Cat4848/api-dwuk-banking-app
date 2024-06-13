import { ResultGenerator } from "../../../lib/ResultGenerator";
export default class CustomersTableAdminPersistance {
    connection;
    constructor(connection) {
        this.connection = connection;
    }
    async create() {
        const resultGenerator = new ResultGenerator();
        try {
            const [confirmation] = await this.connection.execute(`CREATE TABLE IF NOT EXISTS customers (
          customer_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
          officer_id SMALLINT UNSIGNED NOT NULL,
          first_name VARCHAR(255) NOT NULL,
          last_name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          PRIMARY KEY (customer_id),
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
