import mysql from "mysql2/promise";

export default class DatabaseConnection {
  public static async createConnection() {
    const connection = await mysql.createConnection(process.env.JAWSDB_URL);
    return connection;
  }
}
