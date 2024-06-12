import "dotenv/config";
import mysql from "mysql2/promise";
export default class DatabaseConnection {
    static async createConnection() {
        if (process.env.JAWSDB_URL) {
            const connection = await mysql.createConnection(process.env.JAWSDB_URL);
            return connection;
        }
        else {
            const connection = await mysql.createConnection({
                host: process.env.DATABASE_HOST,
                user: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME
            });
            return connection;
        }
    }
}
