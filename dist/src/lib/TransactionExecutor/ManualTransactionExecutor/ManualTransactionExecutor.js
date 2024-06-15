import Account from "../../Account/Account";
import Transaction from "../../Transaction/Transaction";
import createAccountsDatabase from "../../../database/DatabasePersistance/AccountsDatabasePersistance/__tests__/helpers/createAccountsDatabase";
import IDGenerator from "../../IDGenerator/IDGenerator";
export default class ManualTransactionExecutor {
    #fromAccount;
    #toAccount;
    constructor(fromAccount, toAccount) {
        this.#fromAccount = fromAccount;
        this.#toAccount = toAccount;
    }
    get fromAccount() {
        return this.#fromAccount;
    }
    get toAccount() {
        return this.#toAccount;
    }
    async executeTransaction(amount) {
        if (this.areEnoughFunds(amount)) {
            this.moveFunds(amount);
            const accountsDatabase = await createAccountsDatabase();
            await accountsDatabase.putBalance(this.#fromAccount);
            await accountsDatabase.putBalance(this.#toAccount);
        }
        const transaction = new Transaction({
            transaction_id: IDGenerator.smallIntRandomID(),
            from_account_id: this.#fromAccount.account_id,
            to_account_id: this.#toAccount.account_id,
            officer_id: 5,
            transaction_date: new Date().toISOString(),
            amount: amount
        });
        return transaction;
    }
    areEnoughFunds(transactionAmount) {
        return this.#fromAccount.balance >= transactionAmount;
    }
    moveFunds(amount) {
        this.deduct(amount);
        this.add(amount);
    }
    deduct(amount) {
        const newBalance = this.#fromAccount.balance - amount;
        this.#fromAccount.updateBalance(newBalance);
    }
    add(amount) {
        const newBalance = this.#toAccount.balance + amount;
        this.#toAccount.updateBalance(newBalance);
    }
}
const fromAccount = new Account({
    account_id: 2,
    customer_id: 59,
    officer_id: 1,
    open_date: new Date().toISOString(),
    last_activity_date: new Date().toISOString(),
    status: "ACTIVE",
    balance: 100
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
const transactionExe = new ManualTransactionExecutor(fromAccount, toAccount);
