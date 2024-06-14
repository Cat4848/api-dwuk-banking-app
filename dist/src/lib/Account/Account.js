export default class Account {
    #account_id;
    #customer_id;
    #officer_id;
    #open_date;
    #close_date;
    #last_activity_date;
    #status;
    #balance;
    constructor({ account_id, customer_id, officer_id, open_date, close_date, last_activity_date, status, balance }) {
        this.#account_id = account_id;
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
