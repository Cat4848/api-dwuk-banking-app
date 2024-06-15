import ManualTransactionExecutor from "../ManualTransactionExecutor";
import Account from "../../../Account/Account";

const fromAccount = new Account({
  account_id: 2,
  customer_id: 59,
  officer_id: 1,
  open_date: new Date().toISOString(),
  last_activity_date: new Date().toISOString(),
  status: "ACTIVE",
  balance: 200
});

const toAccount = new Account({
  account_id: 3,
  customer_id: 59,
  officer_id: 1,
  open_date: new Date().toISOString(),
  last_activity_date: new Date().toISOString(),
  status: "ACTIVE",
  balance: 100
});

test("if balance method returns enough balance", async () => {
  const manualTransactionExecutor = new ManualTransactionExecutor(
    fromAccount,
    toAccount
  );
  const transactionAmount = 50;
  const enoughBalance =
    manualTransactionExecutor.isEnoughBalance(transactionAmount);
  expect(enoughBalance).toBeTruthy();
});

test("if balance method returns NOT enough balance", async () => {
  const manualTransactionExecutor = new ManualTransactionExecutor(
    fromAccount,
    toAccount
  );
  const transactionAmount = 300;
  const enoughBalance =
    manualTransactionExecutor.isEnoughBalance(transactionAmount);
  expect(enoughBalance).toBeFalsy();
});

test("if fromAccount amount is correct after deduction", () => {
  const transactionAmount = 50;
  const precomputedValue = fromAccount.balance - transactionAmount;

  const manualTransactionExecutor = new ManualTransactionExecutor(
    fromAccount,
    toAccount
  );

  manualTransactionExecutor.deduct(transactionAmount);
  const remainingBalance = manualTransactionExecutor.fromAccount.balance;
  
  expect(remainingBalance).toBe(precomputedValue);
});

test("if toAccount amount is correct after addition", () => {
  const transactionAmount = 50;
  const precomputedValue = toAccount.balance + transactionAmount;

  const manualTransactionExecutor = new ManualTransactionExecutor(
    fromAccount,
    toAccount
  );

  manualTransactionExecutor.add(transactionAmount);
  const remainingBalance = manualTransactionExecutor.toAccount.balance;

  expect(remainingBalance).toBe(precomputedValue);
});
