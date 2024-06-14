import Transaction from "../Transaction";
import IDGenerator from "../../IDGenerator/IDGenerator";

test("if transaction instance creates successfully", () => {
  const transactionID = IDGenerator.smallIntRandomID();
  const transaction = new Transaction({
    transaction_id: transactionID,
    from_account_id: IDGenerator.smallIntRandomID(),
    to_account_id: IDGenerator.smallIntRandomID(),
    officer_id: IDGenerator.smallIntRandomID(),
    transaction_date: new Date().toISOString(),
    amount: 50
  });

  expect(transaction).toHaveProperty("to_account_id");
  expect(transaction).not.toHaveProperty("animal");
  expect(transaction.transaction_id).toBe(transactionID);
});
