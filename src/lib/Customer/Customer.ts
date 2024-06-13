export default class Customer {
  private customer_id: number;
  private officer_id: number;
  private first_name: string;
  private last_name: string;
  private email: string;

  constructor(
    officer_id: number,
    first_name: string,
    last_name: string,
    email: string
  ) {
    this.customer_id = 1;
    this.officer_id = officer_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
  }
}
