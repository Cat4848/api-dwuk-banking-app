import TransactionExecutor from "../../TransactionExecutor";
import Account from "../../../Account/Account";
import Transaction from "../../../Transaction/Transaction";
import createAccountsDatabase from "../../../../database/DatabasePersistance/AccountsDatabasePersistance/__tests__/helpers/createAccountsDatabase";

export default class ManualTransactionExecutor implements TransactionExecutor {
  private fromAccount: Account;
  private toAccount: Account;

  constructor(fromAccount: Account, toAccount: Account) {
    this.fromAccount = fromAccount;
    this.toAccount = toAccount;
  }

  async executeTransaction(amount: number): Transaction {
    if (this.isEnoughBalance(this.fromAccount.balance, amount)) {
      this.deduct(amount);
      this.add(amount);

      const accountsDatabase = await createAccountsDatabase();
    }
  }

  isEnoughBalance(
    fromAccountBalance: number,
    transactionAmount: number
  ): boolean {
    return fromAccountBalance >= transactionAmount;
  }

  deduct(amount: number): void {
    const newBalance = this.fromAccount.balance - amount;
    this.fromAccount.updateBalance(newBalance);
  }

  add(amount: number): void {
    const newBalance = this.toAccount.balance + amount;
    this.toAccount.updateBalance(newBalance);
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
// transactionExe
