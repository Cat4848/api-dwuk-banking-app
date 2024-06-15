import mysql, { ResultSetHeader } from "mysql2/promise";
import { ResultGenerator } from "../../../lib/ResultGenerator/ResultGenerator";
import Customer from "../../../lib/Customer/Customer";
import CustomerRecord from "./declaration/CustomerRecord";

export default class CustomersDatabasePersistance {
  private connection;

  constructor(connection: mysql.Connection) {
    this.connection = connection;
  }

  async post(customer: Customer) {
    const resultGenerator = new ResultGenerator();
    try {
      const [confirmation] = await this.connection.execute<ResultSetHeader>(
        `INSERT INTO customers VALUES (?, ?, ?, ?, ?);`,
        [
          customer.customer_id,
          customer.officer_id,
          customer.first_name,
          customer.last_name,
          customer.email
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
      const [customers] = await this.connection.execute<CustomerRecord[]>(
        `SELECT * FROM customers;`
      );

      const success = resultGenerator.generateSuccess(
        JSON.stringify(customers)
      );
      return success;
    } catch (e) {
      const error = resultGenerator.generateError(e);
      return error;
    } finally {
      await this.connection.end();
    }
  }

  async put(customer: Customer) {
    const resultGenerator = new ResultGenerator();
    try {
      const [confirmation] = await this.connection.execute<ResultSetHeader>(
        `UPDATE customers SET
         first_name = ?,
         last_name = ?,
         email = ?
         WHERE customer_id = ?;`,
        [
          customer.first_name,
          customer.last_name,
          customer.email,
          customer.customer_id
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
  async delete(customerID: number) {
    const resultGenerator = new ResultGenerator();
    try {
      const [confirmation] = await this.connection.execute<ResultSetHeader>(
        `DELETE FROM customers WHERE customer_id = ?;`,
        [customerID]
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
