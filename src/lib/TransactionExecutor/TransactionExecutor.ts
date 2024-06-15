import Transaction from "../Transaction/Transaction";

export default interface TransactionExecutor {
  executeTransaction: (amount: number) => Promise<Transaction>;
  isEnoughBalance: (transactionAmount: number) => boolean;
  deduct: (amount: number) => void;
  add: (amount: number) => void;
}
