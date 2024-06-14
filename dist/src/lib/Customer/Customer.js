import IDGenerator from "../IDGenerator/IDGenerator";
export default class Customer {
    #customer_id = IDGenerator.smallIntRandomID();
    #officer_id;
    #first_name;
    #last_name;
    #email;
    constructor({ officer_id, first_name, last_name, email }) {
        this.#officer_id = officer_id;
        this.#first_name = first_name;
        this.#last_name = last_name;
        this.#email = email;
    }
    get customer_id() {
        return this.#customer_id;
    }
    get officer_id() {
        return this.#officer_id;
    }
    get first_name() {
        return this.#first_name;
    }
    get last_name() {
        return this.#last_name;
    }
    get email() {
        return this.#email;
    }
}
