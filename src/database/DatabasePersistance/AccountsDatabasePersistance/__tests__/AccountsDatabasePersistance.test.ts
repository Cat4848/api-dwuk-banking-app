import Account from "../../../../lib/Account/Account";
import IDGenerator from "../../../../lib/IDGenerator/IDGenerator";
import createAccountsDatabase from "./helpers/createAccountsDatabase";

test("if newly posted account is in database", async () => {
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

  await accountsDatabase.post(account);

  const accountsDatabaseNewConnection = await createAccountsDatabase();
  const postedAccount =
    await accountsDatabaseNewConnection.fetchByID(accountID);

  if (!postedAccount.success) {
    throw postedAccount.error;
  }
  const postedAccountPattern = new RegExp(`"account_id":${accountID}`, "gi");

  expect(postedAccount.data).toMatch(postedAccountPattern);
});

test("if fetched all accounts from database", async () => {
  const accountID = 6219;
  const accountsDatabase = await createAccountsDatabase();
  const accounts = await accountsDatabase.fetchAll();

  if (!accounts.success) {
    throw accounts.error;
  }

  expect(accounts.success).toBe(true);

  const accountPattern = new RegExp(`"account_id":${accountID}`, "gi");
  expect(accounts.data).toMatch(accountPattern);
});

test("if specific account has been fetched", async () => {
  const accountsDatabase = await createAccountsDatabase();
  const accountID = 6219;

  const account = await accountsDatabase.fetchByID(accountID);

  if (!account.success) {
    throw account.error;
  }

  expect(account.success).toBe(true);

  const accountPattern = new RegExp(`"account_id":${accountID}`, "gi");
  expect(account.data).toMatch(accountPattern);
});

test("if account containing customer_id has been fetched", async () => {
  const accountsDatabase = await createAccountsDatabase();
  const customerID = 59;
  const account = await accountsDatabase.fetchByCustomerID(customerID);

  if (!account.success) {
    throw account.error;
  }

  expect(account.success).toBe(true);

  const customerPattern = new RegExp(`"customer_id":${customerID}`, "gi");
  expect(account.data).toMatch(customerPattern);
});

test("if specific account status changed to FROZEN", async () => {
  const accountsDatabase = await createAccountsDatabase();
  const accountID = 6219;

  await accountsDatabase.freeze(accountID);

  const accountsDatabaseNewConnection = await createAccountsDatabase();
  const account = await accountsDatabaseNewConnection.fetchByID(accountID);

  if (!account.success) {
    throw account.error;
  }

  expect(account.data).toMatch(/"status":"FROZEN"/gi);
});

test("if specific account status changed to CLOSED", async () => {
  const accountsDatabase = await createAccountsDatabase();
  const accountID = 6219;

  await accountsDatabase.close(accountID);

  const accountsDatabaseNewConnection = await createAccountsDatabase();
  const account = await accountsDatabaseNewConnection.fetchByID(accountID);

  if (!account.success) {
    throw account.error;
  }

  expect(account.data).toMatch(/"status":"CLOSED"/gi);
});

test("if specific account status changed to ACTIVE", async () => {
  const accountsDatabase = await createAccountsDatabase();
  const accountID = 6219;

  await accountsDatabase.activate(accountID);

  const accountsDatabaseNewConnection = await createAccountsDatabase();
  const account = await accountsDatabaseNewConnection.fetchByID(accountID);

  if (!account.success) {
    throw account.error;
  }

  expect(account.data).toMatch(/"status":"ACTIVE"/gi);
});

test("if the account balance updates correctly", async () => {
  const accountsDatabase = await createAccountsDatabase();
  const accountID = 6219;
  const newBalance = 1000;
  const account = new Account({
    account_id: accountID,
    customer_id: 59,
    officer_id: 1,
    open_date: new Date().toISOString(),
    last_activity_date: new Date().toISOString(),
    status: "ACTIVE",
    balance: newBalance
  });

  await accountsDatabase.putBalance([account]);

  const accountsDatabaseNewConnection = await createAccountsDatabase();
  const updatedAccount =
    await accountsDatabaseNewConnection.fetchByID(accountID);

  if (!updatedAccount.success) {
    throw updatedAccount.error;
  }

  const balancePattern = new RegExp(`"balance":${newBalance}`);
  expect(updatedAccount.data).toMatch(balancePattern);
});
