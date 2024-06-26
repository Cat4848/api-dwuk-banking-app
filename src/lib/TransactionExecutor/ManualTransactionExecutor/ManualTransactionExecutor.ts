import TransactionExecutor from "../TransactionExecutor";
import Account from "../../Account/Account";
import Transaction from "../../Transaction/Transaction";
import createAccountsDatabase from "../../../database/DatabasePersistance/AccountsDatabasePersistance/__tests__/helpers/createAccountsDatabase";
import createTransactionsDatabase from "../../../database/DatabasePersistance/TransactionsDatabasePersistance/__tests__/helpers/createTransactionsDatabase";
import IDGenerator from "../../IDGenerator/IDGenerator";
import officerID from "../../constants/officerID";
import { ResultGenerator, Result } from "../../ResultGenerator/ResultGenerator";

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

  async executeTransaction(amount: number): Promise<Result> {
    const resultGenerator = new ResultGenerator();
    try {
      if (this.areEnoughFunds(amount)) {
        this.moveFunds(amount);
        await this.updateAccountsDatabase();
        await this.updateTransactionsDatabase(amount);

        const success = resultGenerator.generateSuccess(
          "Transaction Executed Successfully."
        );
        return success;
      } else throw new Error("Not enough funds to complete the transaction.");
    } catch (e) {
      const error = resultGenerator.generateError(e);
      return error;
    }
  }

  areEnoughFunds(transactionAmount: number): boolean {
    return this.#fromAccount.balance >= transactionAmount;
  }

  moveFunds(amount: number) {
    this.deduct(amount);
    this.add(amount);
  }

  deduct(amount: number): void {
    const newBalance = this.#fromAccount.balance - amount;
    this.#fromAccount.updateBalance(newBalance);
  }

  add(amount: number): void {
    const newBalance = this.#toAccount.balance + amount;
    this.#toAccount.updateBalance(newBalance);
  }

  async updateAccountsDatabase() {
    const accountsDatabase = await createAccountsDatabase();
    await accountsDatabase.putBalance([this.#fromAccount, this.#toAccount]);
  }

  async updateTransactionsDatabase(amount: number) {
    const transactionsDatabase = await createTransactionsDatabase();
    const transaction = this.createTransaction(amount);
    transactionsDatabase.post(transaction);
  }

  createTransaction(amount: number) {
    const transaction = new Transaction({
      transaction_id: IDGenerator.smallIntRandomID(),
      from_account_id: this.#fromAccount.account_id,
      to_account_id: this.#toAccount.account_id,
      officer_id: officerID,
      transaction_date: new Date().toISOString(),
      amount: amount
    });
    return transaction;
  }
}
