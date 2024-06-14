interface TransactionProps {
  transaction_id: number;
  from_account_id: number;
  to_account_id: number;
  officer_id: number;
  transaction_date: string;
  amount: number;
}

export default class Transaction implements TransactionProps {
  #transaction_id: number;
  #from_account_id: number;
  #to_account_id: number;
  #officer_id: number;
  #transaction_date: string;
  #amount: number;

  constructor({
    transaction_id,
    from_account_id,
    to_account_id,
    officer_id,
    transaction_date,
    amount
  }: TransactionProps) {
    this.#transaction_id = transaction_id;
    this.#from_account_id = from_account_id;
    this.#to_account_id = to_account_id;
    this.#officer_id = officer_id;
    this.#transaction_date = transaction_date;
    this.#amount = amount;
  }

  get transaction_id() {
    return this.#transaction_id;
  }

  get from_account_id() {
    return this.#from_account_id;
  }

  get to_account_id() {
    return this.#to_account_id;
  }

  get officer_id() {
    return this.#officer_id;
  }

  get transaction_date() {
    return this.#transaction_date;
  }

  get amount() {
    return this.#amount;
  }
}
