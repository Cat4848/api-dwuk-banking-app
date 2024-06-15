import createAccountsDatabase from "../../../../../database/DatabasePersistance/AccountsDatabasePersistance/__tests__/helpers/createAccountsDatabase";
import Account from "../../../../Account/Account";

export default async function fetchAccountByID(accountID: number) {
  const accountsDatabase = await createAccountsDatabase();
  const result = await accountsDatabase.fetchByID(accountID);

  if (result.success) {
    const fetchedAccount: Account = await JSON.parse(result.data);
    const account = new Account({
      account_id: fetchedAccount.account_id,
      customer_id: fetchedAccount.customer_id,
      officer_id: fetchedAccount.officer_id,
      open_date: fetchedAccount.open_date,
      close_date: fetchedAccount.close_date,
      last_activity_date: fetchedAccount.last_activity_date,
      status: fetchedAccount.status,
      balance: fetchedAccount.balance
    });
    return account;
  } else {
    const account = new Account({
      account_id: 3,
      customer_id: 59,
      officer_id: 1,
      open_date: new Date().toISOString(),
      last_activity_date: new Date().toISOString(),
      status: "ACTIVE",
      balance: 100
    });
    return account;
  }
}
