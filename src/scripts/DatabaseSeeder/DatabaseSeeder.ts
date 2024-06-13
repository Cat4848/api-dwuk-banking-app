import mysql from "mysql2/promise";

interface DatabaseAdminPersistance {
  create: () => void;
}

export default class OfficersTableAdminPersistance
  implements DatabaseAdminPersistance
{
  private connection;

  constructor(connection: mysql.Connection) {
    this.connection = connection;
  }
  async create() {
    await this.connection.execute(
      `CREATE TABLE IF NOT EXISTS officers (
        officer_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        PRIMARY KEY (officer_id)
      );`
    );
  }
}
