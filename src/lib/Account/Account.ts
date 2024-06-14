import IDGenerator from "../IDGenerator/IDGenerator";

interface AccountProps {
  account_id: number;
  customer_id: number;
  officer_id: number;
  open_date: string;
  close_date?: string;
  last_activity_date: string;
  status: "ACTIVE" | "CLOSED" | "FROZEN";
  balance: number;
}

export default class Account implements AccountProps {
  #account_id: number = IDGenerator.smallIntRandomID();
  #customer_id: number;
  #officer_id: number;
  #open_date: string;
  #close_date?: string;
  #last_activity_date: string;
  #status: "ACTIVE" | "CLOSED" | "FROZEN";
  #balance: number;

  constructor({
    customer_id,
    officer_id,
    open_date,
    close_date,
    last_activity_date,
    status,
    balance
  }: AccountProps) {
    this.#customer_id = customer_id;
    this.#officer_id = officer_id;
    this.#open_date = open_date;
    this.#close_date = close_date;
    this.#last_activity_date = last_activity_date;
    this.#status = status;
    this.#balance = balance;
  }

  get account_id() {
    return this.#account_id;
  }

  get customer_id() {
    return this.#customer_id;
  }

  get officer_id() {
    return this.#officer_id;
  }

  get open_date() {
    return this.#open_date;
  }

  get close_date() {
    return this.#close_date;
  }

  get last_activity_date() {
    return this.#last_activity_date;
  }

  get status() {
    return this.#status;
  }

  get balance() {
    return this.#balance;
  }
}
