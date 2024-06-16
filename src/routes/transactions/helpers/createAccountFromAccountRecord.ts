import Account from "../../../lib/Account/Account.js";
import officerID from "../../../lib/constants/officerID.js";
import AccountRecord from "../../../database/DatabasePersistance/AccountsDatabasePersistance/declaration/AccountRecord.js";

export default async function createAccountFromAccountRecord(
  accountString: string
): Promise<Account> {
  const accountRecord =
    await createAccountRecordFromAccountString(accountString);
  const account = new Account({
    account_id: accountRecord.account_id,
    customer_id: accountRecord.customer_id,
    officer_id: officerID,
    open_date: accountRecord.open_date,
    close_date: accountRecord.close_date,
    last_activity_date: accountRecord.last_activity_date,
    status: accountRecord.status,
    balance: accountRecord.balance
  });
  return account;
}

async function createAccountRecordFromAccountString(
  accountString: string
): Promise<AccountRecord> {
  const accountRecord = (await JSON.parse(accountString)) as AccountRecord;
  return accountRecord;
}
