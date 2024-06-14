import Transaction from "../Transaction";
import IDGenerator from "../../IDGenerator/IDGenerator";

test("if transaction instance creates successfully", () => {
  const transaction = new Transaction({
    transaction_id: IDGenerator.smallIntRandomID(),
    from_account_id: IDGenerator.smallIntRandomID(),
    to_account_id: IDGenerator.smallIntRandomID(),
    officer_id: IDGenerator.smallIntRandomID(),
    transaction_date: new Date().toISOString(),
    amount: 50
  });

  expect(transaction).toHaveProperty("to_account_id");
  expect(transaction).toHaveProperty("officer_id");
  expect(transaction).not.toHaveProperty("animal");
});
