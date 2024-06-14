import { ResultGenerator } from "../../lib/ResultGenerator/ResultGenerator";
export default class CustomersDatabasePersistance {
    connection;
    constructor(connection) {
        this.connection = connection;
    }
    async post(customer) {
        const resultGenerator = new ResultGenerator();
        try {
            const [confirmation] = await this.connection.execute(`INSERT INTO customers VALUES (?, ?, ?, ?, ?);`, [
                customer.customer_id,
                customer.officer_id,
                customer.first_name,
                customer.last_name,
                customer.email
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
            const [customers] = await this.connection.execute(`SELECT * FROM customers;`);
            const success = resultGenerator.generateSuccess(JSON.stringify(customers));
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
    async put(customer) {
        const resultGenerator = new ResultGenerator();
        try {
            const [confirmation] = await this.connection.execute(`UPDATE customers SET
         first_name = ?,
         last_name = ?,
         email = ?
         WHERE customer_id = ?;`, [
                customer.first_name,
                customer.last_name,
                customer.email,
                customer.customer_id
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
    async delete(customerID) {
        const resultGenerator = new ResultGenerator();
        try {
            const [confirmation] = await this.connection.execute(`DELETE FROM customers WHERE customer_id = ?;`, [customerID]);
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
