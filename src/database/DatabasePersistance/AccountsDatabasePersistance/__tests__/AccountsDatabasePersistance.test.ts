import Account from "../../../../lib/Account/Account";
import IDGenerator from "../../../../lib/IDGenerator/IDGenerator";
import createAccountsDatabase from "./helpers/createAccountsDatabase";
import createAccountsDatabaseOnPool from "./helpers/createAccountsDatabaseOnPool";

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

test(`if fetch all active accounts joined with the customers table 
  on customer_id have been fetched correctly`, async () => {
  const accountID = 6219;
  const accountsDatabase = await createAccountsDatabase();
  const accountJoinCustomer = await accountsDatabase.fetchAllJoinCustomers();

  if (!accountJoinCustomer.success) {
    throw accountJoinCustomer.error;
  }

  expect(accountJoinCustomer.success).toBe(true);

  const accountPattern = new RegExp(`"account_id":${accountID}`, "gi");
  expect(accountJoinCustomer.data).toMatch(accountPattern);
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
  const accountIDs = [210, 7282];
  const accountDatabasePool = createAccountsDatabaseOnPool();
  const freezeResult = await accountDatabasePool.freeze(accountIDs);

  for (let accountID of accountIDs) {
    const account = await accountDatabasePool.fetchByID(accountID);
    if (!account.success) throw account.error;
    expect(account.data).toMatch(/"status":"FROZEN"/gi);
  }
});

test("if specific account status changed to CLOSED", async () => {
  const accountIDs = [210, 728];
  const accountsDatabase = await createAccountsDatabase();

  await accountsDatabase.close(accountIDs);

  const accountsDatabaseNewConnection = await createAccountsDatabase();
  const account = await accountsDatabaseNewConnection.fetchByID(accountIDs[0]);

  if (!account.success) {
    throw account.error;
  }

  expect(account.data).toMatch(/"status":"CLOSED"/gi);
});

test("if specific account status changed to ACTIVE", async () => {
  const accountIDs = [210, 728];
  const accountsDatabase = await createAccountsDatabase();

  await accountsDatabase.activate(accountIDs);

  const accountsDatabaseNewConnection = await createAccountsDatabase();
  const account = await accountsDatabaseNewConnection.fetchByID(accountIDs[0]);

  if (!account.success) {
    throw account.error;
  }

  expect(account.data).toMatch(/"status":"ACTIVE"/gi);
});

test("if putAccountStatus function changes account status correctly", async () => {
  const accountID = 210;
  const accountsPoolConnection = createAccountsDatabaseOnPool();
  await accountsPoolConnection.putAccountStatus(accountID, "FROZEN");

  const frozenAccount = await accountsPoolConnection.fetchByID(accountID);
  if (!frozenAccount.success) throw frozenAccount.error;
  expect(frozenAccount.data).toMatch(/"status":"FROZEN"/gi);

  const activateResult = await accountsPoolConnection.putAccountStatus(
    accountID,
    "ACTIVE"
  );
  const activeAccount = await accountsPoolConnection.fetchByID(accountID);
  if (!activeAccount.success) throw activeAccount.error;
  expect(activeAccount.data).toMatch(/"status":"ACTIVE"/gi);
});

test("if putAccountStatus function changes accounts status in a loop", async () => {
  const accountIDs = [210, 728];
  const accountsPool = createAccountsDatabaseOnPool();

  for (let accountID of accountIDs) {
    await accountsPool.putAccountStatus(accountID, "ACTIVE");
    const frozenAccount = await accountsPool.fetchByID(accountID);
    if (!frozenAccount.success) throw frozenAccount.error;
    expect(frozenAccount.data).toMatch(/"status":"ACTIVE"/gi);
  }
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

test("if account exists in the database", async () => {
  const accountIDs = [210, 728];
  const accountsDatabasePool = createAccountsDatabaseOnPool();

  for (let accountID of accountIDs) {
    const isAccountInDatabase = await accountsDatabasePool.isAccount(accountID);
    expect(isAccountInDatabase).toBe(true);
  }
});

test("if account does not exist in the database", async () => {
  const accountIDs = [7852, 9852];
  const accountsDatabasePool = createAccountsDatabaseOnPool();

  for (let accountID of accountIDs) {
    const isAccountInDatabase = await accountsDatabasePool.isAccount(accountID);
    expect(isAccountInDatabase).toBe(false);
  }
});
