import ManualTransactionExecutor from "../ManualTransactionExecutor";
import fetchAccountByID from "./helpers/fetchAccountByID";

const fromAccountID = 6219;
const toAccountID = 6810;

test("if balance method returns enough balance", async () => {
  const fromAccount = await fetchAccountByID(fromAccountID);
  const toAccount = await fetchAccountByID(toAccountID);

  const manualTransactionExecutor = new ManualTransactionExecutor(
    fromAccount,
    toAccount
  );
  const transactionAmount = 50;
  const enoughBalance =
    manualTransactionExecutor.areEnoughFunds(transactionAmount);

  expect(enoughBalance).toBeTruthy();
});

test("if balance method returns NOT enough balance", async () => {
  const fromAccount = await fetchAccountByID(fromAccountID);
  const toAccount = await fetchAccountByID(toAccountID);

  const manualTransactionExecutor = new ManualTransactionExecutor(
    fromAccount,
    toAccount
  );
  const transactionAmount = 10000;
  const enoughBalance =
    manualTransactionExecutor.areEnoughFunds(transactionAmount);

  expect(enoughBalance).toBeFalsy();
});

test("if fromAccount amount is correct after deduction", async () => {
  const fromAccount = await fetchAccountByID(fromAccountID);
  const toAccount = await fetchAccountByID(toAccountID);

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

test("if toAccount amount is correct after addition", async () => {
  const fromAccount = await fetchAccountByID(fromAccountID);
  const toAccount = await fetchAccountByID(toAccountID);

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

test("if transaction executes correctly", async () => {
  const fromAccount = await fetchAccountByID(fromAccountID);
  const toAccount = await fetchAccountByID(toAccountID);

  const transactionAmount = 50;
  const fromAccountPrecomputedValue = fromAccount.balance - transactionAmount;
  const toAccountPrecomputedValue = toAccount.balance + transactionAmount;

  const manualTransactionExecutor = new ManualTransactionExecutor(
    fromAccount,
    toAccount
  );
  await manualTransactionExecutor.executeTransaction(transactionAmount);

  const fromAccountBalance = manualTransactionExecutor.fromAccount.balance;
  const toAccountBalance = manualTransactionExecutor.toAccount.balance;

  expect(fromAccountBalance).toBe(fromAccountPrecomputedValue);
  expect(toAccountBalance).toBe(toAccountPrecomputedValue);
});
