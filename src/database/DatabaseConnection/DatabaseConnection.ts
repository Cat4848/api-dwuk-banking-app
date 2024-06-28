import mysql from "mysql2/promise";
require("dotenv").config();

export default class DatabaseConnection {
  public static async createConnection() {
    const connection = await mysql.createConnection(
      process.env.JAWSDB_URL || "JAWSDB_URL missing"
    );
    return connection;
  }
}
