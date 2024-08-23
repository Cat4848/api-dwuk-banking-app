import mysql from "mysql2/promise";

export default class DatabaseConnection {
  private jawsDbUrl = process.env.JAWSDB_URL || "JAWSDB_URL missing";

  public async createConnection() {
    const connection = await mysql.createConnection(this.jawsDbUrl);
    return connection;
  }

  public createPool() {
    const poolConnection = mysql.createPool(this.jawsDbUrl);
    return poolConnection;
  }
}
