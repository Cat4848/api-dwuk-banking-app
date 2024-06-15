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
