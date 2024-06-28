import mysql from "mysql2/promise";
import "dotenv/config";

export default class DatabaseConnection {
  public static async createConnection() {
    const connection = await mysql.createConnection(
      process.env.JAWSDB_URL || "JAWSDB_URL missing"
    );
    return connection;
  }
}
