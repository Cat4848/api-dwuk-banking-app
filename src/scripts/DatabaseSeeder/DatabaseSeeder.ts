import DatabaseConnection from "../../database/DatabaseConnection/DatabaseConnection";
import mysql from "mysql2/promise";

export default class DatabaseSeeder {
  private connection;

  constructor(connection: mysql.Connection) {
    this.connection = connection;
  }
  
}
