import IDGenerator from "../IDGenerator/IDGenerator";
export default class Transaction {
    #transaction_id = IDGenerator.smallIntRandomID();
    #from_account_id;
    #to_account_id;
    #officer_id;
    #transaction_date;
    #amount;
    constructor({ from_account_id, to_account_id, officer_id, transaction_date, amount }) {
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
