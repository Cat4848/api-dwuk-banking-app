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
  const transactionBalance = 50;
  const enoughBalance =
    manualTransactionExecutor.isEnoughBalance(transactionBalance);
  expect(enoughBalance).toBeTruthy();
});

test("if balance method returns NOT enough balance", async () => {
  const manualTransactionExecutor = new ManualTransactionExecutor(
    fromAccount,
    toAccount
  );
  const transactionBalance = 300;
  const enoughBalance =
    manualTransactionExecutor.isEnoughBalance(transactionBalance);
  expect(enoughBalance).toBeFalsy();
});
