import Transaction from "../../../../lib/Transaction/Transaction";
import IDGenerator from "../../../../lib/IDGenerator/IDGenerator";
import createTransactionsDatabase from "./helpers/createTransactionsDatabase";

test("if newly posted transaction is in database", async () => {
  const transactionsDatabase = await createTransactionsDatabase();
  const transactionID = IDGenerator.smallIntRandomID();
  const fromAccountID = 6810;
  const toAccountID = 6219;
  const officerID = 1;

  const transaction = new Transaction({
    transaction_id: transactionID,
    from_account_id: fromAccountID,
    to_account_id: toAccountID,
    officer_id: officerID,
    transaction_date: new Date().toISOString(),
    amount: 50
  });

  await transactionsDatabase.post(transaction);

  const transactionsDatabaseNewConnection = await createTransactionsDatabase();
  const postedTransaction =
    await transactionsDatabaseNewConnection.fetchByID(transactionID);

  if (!postedTransaction.success) {
    throw postedTransaction.error;
  }

  const postedTransactionPattern = new RegExp(
    `"transaction_id":${transactionID}`,
    "gi"
  );
  expect(postedTransaction.data).toMatch(postedTransactionPattern);
});
