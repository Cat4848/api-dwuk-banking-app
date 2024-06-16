import Account from "../../../lib/Account/Account.js";
import officerID from "../../../lib/constants/officerID.js";
export default async function createAccountFromAccountRecord(accountString) {
    const accountRecord = await createAccountRecordFromAccountString(accountString);
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
async function createAccountRecordFromAccountString(accountString) {
    const accountRecord = (await JSON.parse(accountString));
    return accountRecord;
}
