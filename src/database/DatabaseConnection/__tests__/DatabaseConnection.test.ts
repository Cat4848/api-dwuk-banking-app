import DatabaseConnection from "../DatabaseConnection";

test("if DB connection created", async () => {
  const dbConnection = new DatabaseConnection();
  const connection = await dbConnection.createConnection();
  expect(connection).toHaveProperty("execute");
  await connection.end();
});
