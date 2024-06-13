export default class DatabaseSeeder {
    connection;
    constructor(connection) {
        this.connection = connection;
    }
    async initOfficersTable() {
        await this.connection.execute(`CREATE TABLE IF NOT EXISTS officers (
        officer_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        PRIMARY KEY (officer_id)
      );`);
    }
    async seedOfficersTable() {
        const [result, fields] = await this.connection.execute(`INSERT INTO officers (first_name, last_name, email, password)
        VALUES (?, ?, ?, ?)
      ;`, ["Julie", "Bexon", "julie.bexon@dw-group.co.uk", "julie"]);
    }
}
