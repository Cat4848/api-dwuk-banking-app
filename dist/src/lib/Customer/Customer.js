import IDGenerator from "../IDGenerator/IDGenerator";
export default class Customer {
    customer_id = IDGenerator.smallIntRandomID();
    officer_id;
    first_name;
    last_name;
    email;
    constructor({ officer_id, first_name, last_name, email }) {
        this.officer_id = officer_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
    }
}
