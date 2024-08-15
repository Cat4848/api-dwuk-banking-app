interface CustomerProps {
  customer_id: number;
  officer_id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

export default class Customer implements CustomerProps {
  #customer_id: number;
  #officer_id: number;
  #first_name: string;
  #last_name: string;
  #email: string;
  #created_at: string;

  constructor({
    customer_id,
    officer_id,
    first_name,
    last_name,
    email,
    created_at
  }: CustomerProps) {
    this.#customer_id = customer_id;
    this.#officer_id = officer_id;
    this.#first_name = first_name;
    this.#last_name = last_name;
    this.#email = email;
    this.#created_at = created_at;
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

  get created_at() {
    return this.#created_at;
  }
}
