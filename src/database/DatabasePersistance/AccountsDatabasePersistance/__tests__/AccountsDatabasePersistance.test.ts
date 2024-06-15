import Account from "../../../../lib/Account/Account";
import IDGenerator from "../../../../lib/IDGenerator/IDGenerator";
import createAccountsDatabase from "./helpers/createAccountsDatabase";

test("if an account has been added successfully to database", async () => {
  const accountsDatabase = await createAccountsDatabase();

  const accountID = IDGenerator.smallIntRandomID();
  const account = new Account({
    account_id: accountID,
    customer_id: 59,
    officer_id: 1,
    open_date: new Date().toISOString(),
    last_activity_date: new Date().toISOString(),
    status: "ACTIVE",
    balance: 100
  });

  const result = await accountsDatabase.post(account);

  if (!result.success) {
    throw result.error;
  }

  expect(result.success).toBe(true);
});

test("if fetched all accounts from database", async () => {
  const accountsDatabase = await createAccountsDatabase();
  const accounts = await accountsDatabase.fetchAll();

  if (!accounts.success) {
    throw accounts.error;
  }

  expect(accounts.success).toBe(true);
  expect(accounts.data).toMatch(/"account_id":6219/gi);
});

test("if account containing customer_id=59 has been fetched", async () => {
  const accountsDatabase = await createAccountsDatabase();
  const customerID = 59;
  const account = await accountsDatabase.fetchByCustomerID(customerID);

  if (!account.success) {
    throw account.error;
  }

  expect(account.success).toBe(true);
  expect(account.data).toMatch(/"customer_id":59/gi);
});

test("if account_id=6219 status is changed to FROZEN", async () => {
  const accountsDatabase = await createAccountsDatabase();
  const accountID = 6219;

  const result = await accountsDatabase.freeze(accountID);

  if (!result.success) {
    throw result.error;
  }

  expect(result.success).toBe(true);
});
