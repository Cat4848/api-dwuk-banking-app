import IDGenerator from "../IDGenerator/IDGenerator";

interface CustomerProps {
  customer_id: number;
  officer_id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export default class Customer {
  private customer_id: number = IDGenerator.smallIntRandomID();
  private officer_id: number;
  private first_name: string;
  private last_name: string;
  private email: string;

  constructor({ officer_id, first_name, last_name, email }: CustomerProps) {
    this.officer_id = officer_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
  }
}
