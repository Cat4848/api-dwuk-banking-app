import IDGenerator from "../IDGenerator/IDGenerator";

interface OfficerProps {
  officer_id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export default class Officer implements OfficerProps {
  #officer_id: number = IDGenerator.smallIntRandomID();
  #first_name: string;
  #last_name: string;
  #email: string;

  constructor({ first_name, last_name, email }: OfficerProps) {
    this.#first_name = first_name;
    this.#last_name = last_name;
    this.#email = email;
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
