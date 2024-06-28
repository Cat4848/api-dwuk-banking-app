import mysql from "mysql2/promise";
import JAWSDB_URL from "../../../env";

export default class DatabaseConnection {
  public static async createConnection() {
    const connection = await mysql.createConnection(
      process.env.JAWSDB_URL || JAWSDB_URL
    );
    return connection;
  }
}
