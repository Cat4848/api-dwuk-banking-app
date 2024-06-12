import DatabaseConnection from "../DatabaseConnection";

test("create DB connection", async () => {
  const connection = await DatabaseConnection.createConnection();
});
