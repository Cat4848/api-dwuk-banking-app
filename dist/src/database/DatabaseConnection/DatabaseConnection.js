import "dotenv/config";
import mysql from "mysql2/promise";
export default class DatabaseConnection {
    static async createConnection() {
        if (process.env.JAWSDB_URL) {
            const connection = await mysql.createConnection(process.env.JAWSDB_URL);
            return connection;
        }
        else {
            const error = new Error("JAWSDB_URL not available in environment variables");
            const connection = await mysql.createConnection(error.message);
            return connection;
        }
    }
}
