export default class Customer {
    customer_id;
    officer_id;
    first_name;
    last_name;
    email;
    constructor(officer_id, first_name, last_name, email) {
        this.customer_id = 1;
        this.officer_id = officer_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
    }
}
