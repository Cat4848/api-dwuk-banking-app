import TransactionExecutor from "../TransactionExecutor";
import Account from "../../Account/Account";
import Transaction from "../../Transaction/Transaction";
import createAccountsDatabase from "../../../database/DatabasePersistance/AccountsDatabasePersistance/__tests__/helpers/createAccountsDatabase";

export default class ManualTransactionExecutor implements TransactionExecutor {
  #fromAccount: Account;
  #toAccount: Account;

  constructor(fromAccount: Account, toAccount: Account) {
    this.#fromAccount = fromAccount;
    this.#toAccount = toAccount;
  }

  get fromAccount() {
    return this.#fromAccount;
  }

  get toAccount() {
    return this.#toAccount;
  }

  async executeTransaction(amount: number): Promise<Transaction> {
    if (this.isEnoughBalance(amount)) {
      this.deduct(amount);
      this.add(amount);

      const accountsDatabase = await createAccountsDatabase();
    }

    const transaction = new Transaction({
      transaction_id: 1,
      from_account_id: 3,
      to_account_id: 4,
      officer_id: 5,
      transaction_date: new Date().toISOString(),
      amount: 20
    });
    return transaction;
  }

  isEnoughBalance(transactionAmount: number): boolean {
    return this.#fromAccount.balance >= transactionAmount;
  }

  deduct(amount: number): void {
    const newBalance = this.#fromAccount.balance - amount;
    this.#fromAccount.updateBalance(newBalance);
  }

  add(amount: number): void {
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
