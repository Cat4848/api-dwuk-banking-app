import DatabaseConnection from "../DatabaseConnection";

test("if DB connection created", async () => {
  const connection = await DatabaseConnection.createConnection();
  expect(connection).toHaveProperty("execute");
});
