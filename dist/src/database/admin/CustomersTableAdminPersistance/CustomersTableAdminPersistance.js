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
          
        );`);
        }
        catch (e) {
        }
    }
}
