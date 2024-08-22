import DatabaseConnection from "../DatabaseConnection";

test("if DB connection created", async () => {
  const dbConn = new DatabaseConnection();
  const connection = await dbConn.createConnection();
  expect(connection).toHaveProperty("execute");
  await connection.end();
});
