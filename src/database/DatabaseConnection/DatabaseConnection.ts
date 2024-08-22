import mysql from "mysql2/promise";
import "dotenv/config";

export default class DatabaseConnection {
  private jawsDbUrl = process.env.JAWSDB_URL || "JAWSDB_URL missing";

  public async createConnection() {
    const connection = await mysql.createConnection(this.jawsDbUrl);
    return connection;
  }

  public createPool() {
    const pool = mysql.createPool(this.jawsDbUrl);
    return pool;
  }
}
