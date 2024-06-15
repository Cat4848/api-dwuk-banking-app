import { Result } from "../ResultGenerator/ResultGenerator";

export default interface TransactionExecutor {
  executeTransaction: (amount: number) => Promise<Result>;
  areEnoughFunds: (transactionAmount: number) => boolean;
  deduct: (amount: number) => void;
  add: (amount: number) => void;
}
