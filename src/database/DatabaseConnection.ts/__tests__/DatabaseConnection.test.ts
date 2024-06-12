import DatabaseConnection from "../DatabaseConnection";

test("create DB connection", async () => {
  const connection = new DatabaseConnection();
  const db = await connection.createConnection();
});
